function Validator(option) {
  //get parentElement
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  var selectorRules = {};

  //ham validate tat ca cac rule
  function validate(inputElement, rule) {
    // getParent(inputElement, ".form-group");
    var errorElement = getParent(
      inputElement,
      option.formGroupSelector
    ).querySelector(option.error);
    var errorMessage;

    var rules = selectorRules[rule.selector];

    for (var i = 0; i < rules.length; ++i) {
      switch (inputElement.type) {
        case "checkbox":
        case "radio":
          errorMessage = rules[i](
            formElement.querySelector(rule.selector + ":checked")
          );

          break;
        default:
          errorMessage = rules[i](inputElement.value);
      }
      if (errorMessage) break;
    }

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      getParent(inputElement, option.formGroupSelector).classList.add(
        "invalid"
      );
    } else {
      errorElement.innerText = "";
      getParent(inputElement, option.formGroupSelector).classList.remove(
        "invalid"
      );
    }
    return !errorMessage;
  }

  var formElement = document.querySelector(option.form);
  if (formElement) {
    //lang nghe su kien onsubmit cua form
    formElement.onsubmit = function (e) {
      e.preventDefault();

      var isFormValid = true;
      //   lap qua tung rule va validate
      option.rules.forEach((rule) => {
        var inputElement = formElement.querySelector(rule.selector);
        var isValid = validate(inputElement, rule);
        if (!isValid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        if (typeof option.onSubmit === "function") {
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

          console.log(formValues);
          option.onSubmit(formValues);
        }
      } else {
        // formElement.submit();
      }
    };
    //lang nghe rule cho moi input
    option.rules.forEach((rule) => {
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }

      var inputElements = formElement.querySelectorAll(rule.selector);
      Array.from(inputElements).forEach((inputElement) => {
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };
        inputElement.oninput = function () {
          var errorElement = inputElement.parentElement.querySelector(
            option.error
          );
          errorElement.innerText = "";
          inputElement.parentElement.classList.remove("invalid");
        };
      });
    });
  }
}

Validator.isRequired = function (selector, message) {
  return {
    selector,
    test: function (value) {
      return value ? undefined : message || "Vui lòng nhập trường này!";
    },
  };
};

Validator.isEmail = function (selector, message) {
  return {
    selector,
    test: function (value) {
      var emailRegex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return emailRegex.test(value)
        ? undefined
        : message || "Vui lòng nhập email chính xác!";
    },
  };
};

Validator.minLength = function (selector, min, message) {
  return {
    selector,
    test: function (value) {
      return value.length >= min
        ? undefined
        : message || `Vui lòng nhập tối thiểu ${min} ký tự trở lên!`;
    },
  };
};

Validator.isConfirmed = function (selector, getConfirmValue, message) {
  return {
    selector,
    test: function (value) {
      return value === getConfirmValue()
        ? undefined
        : message || `Giá trị nhập vào không chính xác!`;
    },
  };
};
