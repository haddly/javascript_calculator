function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

calculator = function () {
  var _ref;

  var string_to_eval = "",
      array = [],
      answer = void 0,
      stored_number = false,
      number_val = void 0,
      calc_val = void 0,
      first_is_zero = false,
      last_nums_in_string = "",
      regex_calc_symb = /(\+|\/|\-|\*)/g,
      answer_ = document.getElementById("answer"),
      answer_html = void 0,
      temp_array1 = void 0,
      temp_array2 = void 0;

  function change_font_size_if_over_20() {
    if (string_to_eval.length < 18) {
      answer_.style.fontSize = "25px";
    }
    if (string_to_eval.length >= 18 && string_to_eval.length <= 59) {
      answer_.style.fontSize = "16px";
      //answer_.stlye.
    }
  }

  //button click between 1-9 gets the value of the button id and adds it to string.
  function add_one_to_nine(clicked_id) {
    change_font_size_if_over_20();
    if (string_to_eval.length > 59) {
      return;
    }
    number_val = clicked_id;

    if (last_nums_in_string.charAt(0) === "0" && last_nums_in_string.length === 1) {
      last_nums_in_string = "";
      string_to_eval = string_to_eval.slice(0, -1);
      string_to_eval += number_val;
      last_nums_in_string += number_val;
      convert_correct_symb();
      answer_.innerHTML = answer_html;
      //answer_.innerHTML = string_to_eval;
    } else {
      string_to_eval += number_val;
      last_nums_in_string += number_val;
      convert_correct_symb();
      answer_.innerHTML = answer_html;
      //answer_.innerHTML = string_to_eval;
    }
  }
  //check if a string has been evaluated: if yes, clicking num or calc makes string empty.
  function check_stored_number() {
    if (stored_number) {
      answer_.innerHTML = "0";
      stored_number = "";
    } else {
      return;
    }
    convert_correct_symb();
    answer_.innerHTML = answer_html;
    //answer_.innerHTML = string_to_eval;
  }

  function add_sub_div_or_mul(one_of_the_four) {
    if (string_to_eval.length > 59) {
      return;
    }
    change_font_size_if_over_20();
    check_stored_number();
    var e = string_to_eval.charAt(string_to_eval.length - 1);

    calc_val = one_of_the_four;
    if (e === "+" || e === "/" || e === "*" || e === "-" || !e.length) {
      return;
    } else {
      last_nums_in_string = "";
      string_to_eval += calc_val;
      convert_correct_symb();
      answer_.innerHTML = answer_html;
      //answer_.innerHTML = string_to_eval;
    }
  }
  function maybe_add_zero() {
    if (string_to_eval.length > 59) {
      return;
    }
    change_font_size_if_over_20();
    if (last_nums_in_string.length === 0) {
      string_to_eval += "0";
      last_nums_in_string += "0";
      convert_correct_symb();
      answer_.innerHTML = answer_html;
      //answer_.innerHTML = string_to_eval;
    }
    if (last_nums_in_string.charAt(0) === "0") {
      return;
    } else {
      string_to_eval += "0";
      last_nums_in_string += "0";
      convert_correct_symb();
      answer_.innerHTML = answer_html;
      //answer_.innerHTML = string_to_eval;
    }
  }
  //add dot if a dot doesn't exist yet or string is not len = 0
  function maybe_add_dot() {
    if (string_to_eval.length > 59) {
      return;
    }
    change_font_size_if_over_20();

    if (last_nums_in_string.length === 0) {
      return;
    }
    if (last_nums_in_string.indexOf(".") > -1) {
      return;
    } else {
      string_to_eval += ".";
      last_nums_in_string += ".";
    }
    convert_correct_symb();
    answer_.innerHTML = answer_html;
    //answer_.innerHTML = string_to_eval;
  }

  // Press the "AC" button and it displays "0" and then the string is back to "" for next input.
  var deleteArray = function deleteArray() {
    string_to_eval = "";
    last_nums_in_string = "";
    change_font_size_if_over_20();
    answer_.innerHTML = "0";
  };

  function cancelLastInput() {
    if (regex_calc_symb.test(string_to_eval.charAt(string_to_eval.length - 1))) {
      string_to_eval = string_to_eval.slice(0, -1);
      last_nums_in_string = get_last_nums_in_string();
      convert_correct_symb();
      change_font_size_if_over_20();
      answer_.innerHTML = answer_html;
      //answer_.innerHTML = string_to_eval;
    } else {
      last_nums_in_string = get_last_nums_in_string();
      var last_nums_in_string_length = last_nums_in_string.length;
      string_to_eval = string_to_eval.slice(0, -last_nums_in_string_length);
      convert_correct_symb();
      change_font_size_if_over_20();
      answer_.innerHTML = answer_html;
      //answer_.innerHTML = string_to_eval;
    }
  }
  function get_last_nums_in_string() {
    var plus_ = string_to_eval.lastIndexOf("+"),
        minus_ = string_to_eval.lastIndexOf("-"),
        times_ = string_to_eval.lastIndexOf("*"),
        div_ = string_to_eval.lastIndexOf("/");
    var e = [];
    e.push(plus_, minus_, times_, div_);
    e.sort();
    var j = e[e.length - 1];
    var temp = string_to_eval;
    var i = string_to_eval.length - 1;
    var z = "";
    do {
      z += temp.charAt(temp.length - 1);
      temp = temp.slice(0, -1);
      i--;
    } while (i > j);
    return z.split("").reverse().join("");
  }

  // use eval to evaluate string
  var evaluateArray = function evaluateArray() {
    var h = string_to_eval.charAt(string_to_eval.length - 1);
    if (h === "+" || h === "-" || h === "*" || h === "/") {
      stored_number = "";
      return;
    }
    if (h.length === 0) {
      return;
    }
    if (!Number(eval(string_to_eval))) {
      return;
    } else {
      var _answer = eval(string_to_eval);
      stored_number = _answer;
      string_to_eval = _answer.toString();
      change_font_size_if_over_20();
      last_nums_in_string = "";
      answer_.innerHTML = _answer;
      string_to_eval = "";
    }
  };
  // "OFF" button displays empty string and sets string to empty string
  var turnOff = function turnOff() {
    string_to_eval = "";
    last_nums_in_string = "";
    answer_.innerHTML = "";
  };

  function convert_correct_symb() {
    answer_html = Array.from(string_to_eval);
    temp_array1 = answer_html.map(function (x) {
      return x === "/" ? x = "&#247;" : x = x;
    });
    temp_array2 = temp_array1.map(function (x) {
      return x === "*" ? x = "&times;" : x = x;
    });

    //return x === "/" ? x = "&#247;" : x = x;


    answer_html = temp_array2.join("");
  }
  return _ref = {
    deleteArray: deleteArray,
    turnOff: turnOff,
    cancelLastInput: cancelLastInput,
    add_sub_div_or_mul: add_sub_div_or_mul,
    add_one_to_nine: add_one_to_nine
  }, _defineProperty(_ref, "add_sub_div_or_mul", add_sub_div_or_mul), _defineProperty(_ref, "maybe_add_zero", maybe_add_zero), _defineProperty(_ref, "maybe_add_dot", maybe_add_dot), _defineProperty(_ref, "evaluateArray", evaluateArray), _ref;
}();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////