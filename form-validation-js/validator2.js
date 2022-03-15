function Validator(formElement) {
  function getParentElement(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
    }
  }
  var formRules = {};
  var _this = this;

  //   Quy ước tạo rule: nếu có lỗi thì return `error message`| nếu không có lỗi thì return undefined
  var validatorRules = {
    required: function (value) {
      return value ? undefined : `Vui lòng nhập trường này`;
    },
    email: function (value) {
      var emailRegex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return emailRegex.test(value)
        ? undefined
        : `Vui lòng nhập email chính xác`;
    },
    min: function (min) {
      return function (value) {
        return value.length >= min
          ? undefined
          : `Vui lòng nhập ít nhất ${min} ký tự`;
      };
    },
  };
  var formElement = document.querySelector(formElement);

  if (formElement) {
    var inputs = formElement.querySelectorAll("[name][rule]");
    for (var input of inputs) {
      var rules = input.getAttribute("rule").split("|");
      for (var rule of rules) {
        var isRuleHasValue = rule.includes(":");
        var ruleInfo;
        if (isRuleHasValue) {
          ruleInfo = rule.split(":");
          rule = ruleInfo[0];
        }

        var ruleFunc = validatorRules[rule];
        if (isRuleHasValue) {
          ruleFunc = ruleFunc(ruleInfo[1]);
        }
        if (Array.isArray(formRules[input.name])) {
          formRules[input.name].push(ruleFunc);
        } else {
          formRules[input.name] = [ruleFunc];
        }
      }

      //   lang nghe su kien de validate (blur, onchange)
      input.onblur = handleValidate;
      input.oninput = handleClearError;
    }

    function handleValidate(e) {
      var rules = formRules[e.target.name];
      var errorMessage;
      rules.map((rule) => {
        errorMessage = rule(e.target.value);
        return errorMessage;
      });
      if (errorMessage) {
        var formGroupEl = getParentElement(e.target, ".form-group");
        if (formGroupEl) {
          formGroupEl.classList.add("invalid");
          var formMessageEl = formGroupEl.querySelector(".form-message");
          if (formMessageEl) {
            formMessageEl.innerText = errorMessage;
          }
        }
      }
      return !errorMessage;
    }

    function handleClearError(e) {
      var formGroupEl = getParentElement(e.target, ".form-group");
      if (formGroupEl.classList.contains("invalid")) {
        formGroupEl.classList.remove("invalid");
        var formMessageEl = formGroupEl.querySelector(".form-message");
        if (formMessageEl) {
          formMessageEl.innerText = "";
        }
      }
    }
  }

  //Xu ly submit form
  formElement.onsubmit = function (e) {
    e.preventDefault();

    if (formElement) {
      var inputs = formElement.querySelectorAll("[name][rule]");
      var isValid = true;

      for (var input of inputs) {
        if (
          !handleValidate({
            target: input,
          })
        ) {
          isValid = false;
        }
      }
      if (isValid) {
        if (typeof _this.onSubmit === "function") {
          var validInputs = formElement.querySelectorAll("[name]");
          var formValues = Array.from(validInputs).reduce(function (
            values,
            input
          ) {
            switch (input.type) {
              case "radio":
                values[input.name] = formElement.querySelector(
                  'input[name="' + input.name + '"]:checked'
                ).value;
                break;
              case "checkbox":
                if (!input.matches(":checked")) return values;
                if (!Array.isArray(values[input.name])) {
                  values[input.name] = [];
                }
                values[input.name].push(input.value);
                break;

              case "file":
                values[input.name] = input.files;
                break;
              default:
                values[input.name] = input.value;
            }
            return values;
          },
          {});
          _this.onSubmit(formValues);
        } else {
          formElement.submit();
        }
      }
    }
  };
}
