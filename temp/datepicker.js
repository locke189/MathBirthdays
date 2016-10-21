/**  datepicker widget object  */
class DatePickerWidget {

  /**
  * Creates the Datepicker Widget
  *
  */
  constructor({DOMElementID, startYear, endYear}){
    this.DOMElement = document.getElementById(DOMElementID);
    this.id = DOMElementID;
    this.html = '';
    this.startYear = startYear;
    this.endYear = endYear;
    this.months = [
      {text: 'January', number: 0},
      {text: 'February', number: 1},
      {text: 'March', number: 2},
      {text: 'May', number: 3},
      {text: 'April', number: 4},
      {text: 'June', number: 5},
      {text: 'July', number: 6},
      {text: 'August', number: 7},
      {text: 'September', number: 8},
      {text: 'October', number: 9},
      {text: 'November', number: 10},
      {text: 'December', number: 11}
    ];

    this.today = new Date();  //beware... this is not taking the limits
    this.year = this.today.getFullYear();
    this.month = this.today.getMonth();


    this._createSelectionBoxes();
    this._createForm();
    this.datePicker = new DatePickerMonth(
      `${this.id}-widget-datepicker`,
      this,
      this.year,
      this.month,
      this.today.getDate()
      );
    this._getDOMElements();
    this._addYearsToDropdown();
    this._addMonthsToDropdown();
    this._setFallbackDatepickerCallback();
    this.DOMInputDatePicker.valueAsDate = this.getDate();
  } // .constructor

//**********PUBLIC***************


  /**
  * Returns date object with selected date
  *
  * @return {Date} object, returnd date object
  */
  getDate(){
    return new Date( this.year, this.month, this.datePicker.getDate() );
  }


//**********END OF PUBLIC***************

//**********PRIVATE***************
  /**
  * Creates a form to include all selection boxes
  *
  */
  _createForm(){

    this.html =`
      <form>
        <div class="container hidden-xs">
          ${this.yearBoxHtml}
          ${this.monthBoxHtml}
          ${this.datePickerHtml}
        </div> <!-- .container -->
        ${this.mobileFallbackHtml}
      </form> <!-- form -->
      `;
    this.DOMElement.innerHTML = this.html;

  } //._createForm


  /**
  * Creates the selection boxes (year / Month)
  *
  */
  _createSelectionBoxes(){
    //Year Selection Box
    this.yearBoxHtml =`
          <!--Year Selection Box-->
            <div class="row">
              <div class="col-lg-2 col-md-2 col-sm-4 no-padding-left no-padding-right">
                <div class="input-group">
                  <input type="number" id="${this.id}-widget-year-input" class="form-control text-center dropdown-toggle"  min="${this.startYear}" max="${this.endYear}" aria-label="..." value="${this.year}">
                  <div class="input-group-btn dropdown">
                    <button class="btn btn-default dropdown-toggle" type="button" id="${this.id}-dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <span class="caret"></span>
                    </button>
                      <ul id="${this.id}-widget-year-dropdown" class="dropdown-menu scrollable-menu" role="menu" aria-labelledby="dropdownMenu1">
                      </ul>
                  </div>
                </div>
              </div> <!-- col -->
            </div> <!-- row -->
            `;

    //Month Selection Box
    this.monthBoxHtml = `
            <!--Month Selection Box-->
            <div class="row">
              <div class="col-lg-2 col-md-2 col-sm-4 no-padding-left no-padding-right">
                <div class="input-group">
                  <input type="text" id="${this.id}-widget-month-input" class="form-control text-center dropdown-toggle" readonly aria-label="..." value="${this.months[this.month].text}">
                  <div class="input-group-btn dropdown">
                    <button class="btn btn-default dropdown-toggle" type="button" id="${this.id}-dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <span class="caret"></span>
                    </button>
                      <ul id="${this.id}-widget-month-dropdown" class="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenu2">
                      </ul>
                  </div>
                </div>
              </div> <!-- col -->
            </div> <!-- row -->
            `;

    this.datePickerHtml = `
            <!--Date selection-->
            <div id="${this.id}-widget-datepicker" class="input-group row bottom-buffer"></div>
      `;

    //Fallback for mobile
    this.mobileFallbackHtml = `
          <!-- fallback -->
          <div class="container visible-xs bottom-buffer" >
            <div class="row">
              <p><input id="${this.id}-widget-date-input" type="date" class="visible-xs col-xs-12 text-center" name="date"></p>
            </div>
          </div> <!--end of fallback-->
          `;

  } // ._createSelectionBoxes

/**
* Creates DOM Element properties
*
*/
  _getDOMElements(){
    this.DOMInputYear = document.getElementById(`${this.id}-widget-year-input`);
    this.DOMInputMonth = document.getElementById(`${this.id}-widget-month-input`);
    this.DOMInputDatePicker = document.getElementById(`${this.id}-widget-date-input`);
    this.DOMWidgetDatepicker = document.getElementById(`${this.id}-widget-datepicker`);
    this.DOMDropdownMonth = document.getElementById(`${this.id}-widget-month-dropdown`);
    this.DOMDropdownYear = document.getElementById(`${this.id}-widget-year-dropdown`);
  }// ._getDOMElements

/**
*   sets years in dropdown list
*
*/
  _addYearsToDropdown(){
    for (let i = this.startYear; i <= this.endYear; i++) {
      this.DOMDropdownYear.innerHTML += `<li class="text-center"><a id="${this.id}-year-${i}">${i}</a></li>`;
    }
    this._setYearsCallback();
  } // ._addYearsToDropdown

/**
*   sets months in calback list
*
*/
  _setYearsCallback(){
    let yearDom;
    for (let i = this.startYear; i <= this.endYear; i++) {
      yearDom = document.getElementById(`${this.id}-year-${i}`);
      yearDom.onclick = () => {
        this.DOMInputYear.value = i;
        this.year = i;
        this.datePicker.changeDate(this.year, this.month);
        this.DOMInputDatePicker.valueAsDate = this.getDate();
      };
    }
  } // ._setYearsCallback



/**
*   sets months in dropdown list
*
*/
  _addMonthsToDropdown(){
    this.months.forEach((month) => {
      this.DOMDropdownMonth.innerHTML += `<li class="text-center"><a  id="${this.id}-month-${month.number}">${month.text}</a></li>` ;
    });
    this._setMonthsCallback();
  } // ._addMonthsToDropdown

/**
*   sets months in calback list
*
*/
  _setMonthsCallback(){
    let monthDom;
    this.months.forEach((month)=> {
      monthDom = document.getElementById(`${this.id}-month-${month.number}`);
      monthDom.onclick = () => {
        this.DOMInputMonth.value = month.text;
        this.month = month.number;
        this.datePicker.changeDate(this.year, this.month);
        this.DOMInputDatePicker.valueAsDate = this.getDate();
      };
    });
  } // ._setMonthsCallback


/**
*   sets datepicker calback
*
*/
  _setFallbackDatepickerCallback(){
    //validation
    this.DOMInputDatePicker.onchange = () => {
      const date = new Date(this.DOMInputDatePicker.value);
      date.setTime(date.getTime() + new Date().getTimezoneOffset()*60*1000);
      this.month = date.getMonth();
      this.DOMInputMonth.value = this.months[this.month].text;
      this.year = date.getFullYear();
      this.DOMInputYear.value = this.year;
      this.datePicker.changeDate( this.year, this.month, date.getDate() );
    };
  }

//**********END OF PRIVATE***************
} // .DatePickerWidget.



//**********PRIVATE CLASS***************

/**  day buttons datepicker widget object  */
class DatePickerMonth {

  /**
  * Creates the Datepicker Widget month
  *
  */
  constructor(DOMElementID, widget, year = 2016, month = 0, date = 1 ){

    this.parentWidget = widget;
    this.DOMElement = document.getElementById(DOMElementID);
    this.id = DOMElementID;
    this.days = [];
    this.month = month;
    this.year = year;
    this.date = date;
    this.html = '';
    this._getDaysOfMonth();
    this._setHtml();
    this._setDateCallbacks();


  }

  /**
  * Refreshes the datePickerMonth object for new year and month
  * @param {Number} year, format YYYY
  * @param {Number} month, format MM
  */
  changeDate(year, month, date = this.date){
    this.month = month;
    this.year = year;

    if( date >  this._getFinalDayOfMonth(year,month) ) {
      this.date = this._getFinalDayOfMonth(year,month);
    }
    else{
      this.date = date;
    }

    this.html = '';
    this._getDaysOfMonth();
    this._setHtml();
    this._setDateCallbacks();
  }

  /**
  * returns this.date
  *
  */
  getDate(){
    return this.date;
  }


  /**
  * Creates the Datepicker Widget month
  * @param {Number} year, format YYYY
  * @param {Number} month, format MM
  */
  _getDaysOfMonth(year = this.year, month = this.month){
    const finalDayOfMonth = this._getFinalDayOfMonth(year,month);
    this.days = [];
    for(let i = 1; i <= finalDayOfMonth; i++){
      this.days.push({
        html:this._getDateButtonHtml(i),
        id: `${this.id}-dp-datebutton-${i}`,
        DOM: document.getElementById(`${this.id}-dp-datebutton-${i}`),
        value: i
      });
    }
    return this.days;
  }

  /**
  *   gets the final day of the month
  *
  *   @param {number} year,
  *   @param {number} Month,
  *   @result {number}, last day of the month.
  */
  _getFinalDayOfMonth(year, month){
    const printMonth = new Date(year,month,1);
    printMonth.setMonth(printMonth.getMonth() + 1);
    printMonth.setDate(printMonth.getDate() - 1);
    return printMonth.getDate();
  }

  /**
  *   sets html for a given date
  *
  *   @param {DOMelement}, DOM element
  *   @result {String}, date of the button.
  */
  _getDateButtonHtml(calendarDate){
    return `
    <button id="${this.id}-dp-datebutton-${calendarDate}" class="btn btn-default col-lg-1 col-md-1 col-sm-1 hidden-xs text-center" type="button">
      <span aria-hidden="true"> ${calendarDate}</span>
    </button>
    `;
  }

  /**
  *   Prints HTML for all days in a month
  *
  */
  _setHtml(){
    this.html = '';
    this.days.forEach( day => this.html += day.html );
    this.DOMElement.innerHTML = this.html;
    document.getElementById(`${this.id}-dp-datebutton-${this.date}`).classList.add('btn-success', `${this.id}`);

    return this.html;
  }

  /**
  *   assigns callback function for date buttons
  *
  */
  _setDateCallbacks(){
    this.days.forEach( day => {
      day.DOM = document.getElementById(day.id);
      day.DOM.onclick = () => {
        const element = document.querySelector(`.btn-success, .${this.id}`);
        if (element)
          element.classList.remove('btn-success', `${this.id}`);
        day.DOM.classList.add('btn-success', `${this.id}`);
        this.date = day.value;
        this.parentWidget.DOMInputDatePicker.valueAsDate = this.parentWidget.getDate();
      };
    } );
  }

}
//**********END OF PRIVATE CLASS***************

/**  Mathbirthday calculator  */
class MathBirthdayCalculator {

  /**
  * Creates the Datepicker Widget
  *
  */
  constructor(DOMElementID, dateFunction){
    this.DOMElement = document.getElementById(DOMElementID);
    this.id = DOMElementID;
    this.getDate = dateFunction;
    this.months = [
      {text: 'January', number: 0},
      {text: 'February', number: 1},
      {text: 'March', number: 2},
      {text: 'May', number: 3},
      {text: 'April', number: 4},
      {text: 'June', number: 5},
      {text: 'July', number: 6},
      {text: 'August', number: 7},
      {text: 'September', number: 8},
      {text: 'October', number: 9},
      {text: 'November', number: 10},
      {text: 'December', number: 11}
    ];

    //init
    this._printHtml();
    this._getDOMElements();
    this._assignButtonCallback();


  } //.constructor

  /**
  *   Prints HTML for calculator
  *
  */
  _printHtml(){
    this.html = `
    <div class='container'>
    <div class='row'>
      <div><button  id="${this.id}-calculate-button" class="col-xs-12 btn btn-primary btn-lg " role="button">Tell me my next MathBirthday!</button></div>
      <div id='${this.id}-alertmessage' class="col-xs-12 alert alert-success hidden top-buffer " role="alert"></div></p>
    </div><!--End of Buttons and message-->
    <div class'container'>
    `;
    this.DOMElement.innerHTML = this.html;
  }// ._printHtml

/**
*   check if the date selected is not in the future.
*
*   @param {Date} selectedDate type Date.
*   @return {boolean}, true if valid date.
*/
  _dateValidation(){
    const today = new Date();
    if (this.getDate() > today){
      this.alertMessage.innerHTML = `Please pick a valid date! :)
        ... I will not tolerate future dates!`;
      return false;
    }
    return true;
  }

/**
* Creates DOM Element properties
*
*/
  _getDOMElements(){
    this.button = document.getElementById(`${this.id}-calculate-button`);
    this.alertMessage = document.getElementById(`${this.id}-alertmessage`);
  }// ._getDOMElements


/**
*   Assigns calculate function to button
*
*/
  _assignButtonCallback(){
    //On click calculates the next mathbirthday.
    this.button.onclick =  () => {
      this.alertMessage.classList.remove('hidden');
      if (this._dateValidation()){
        const mathbirthday = this._calculateNextMathbirthday();
        this.alertMessage.innerHTML = `Your # ${mathbirthday.power} MathBirthday is on
        ${this.months[mathbirthday.mbday.getMonth()].text} ${mathbirthday.mbday.getDate()}, ${mathbirthday.mbday.getFullYear()}!` ;
      }
    };
  }


/**
*   calculates the next math birthday for the specified birth date.
*   Mathbirthdays happen when people are 10^n days old.
*
*
*   @param {Date} birthdate.
*   @return {Number} result.power, power of 10th of the next mathbirthday.
*   @return {Date}  result.mbday, date of the upcoming mathbirthday.
*/
  _calculateNextMathbirthday(){

    const today = new Date();
    //difference in days.
    const diff = parseInt( ( today - this.getDate() )/( 24*3600*1000 ) );
    //the lenght of the # of days determines the next MathBirthday.
    const mbexpn = diff.toString().length;
    // we get next mathbirthday  by adding 10^(mb_n+1) to the birthday.
    const nextMBday = new Date();
    nextMBday.setDate( this.getDate().getDate() + Math.pow(10, mbexpn) );

    //now we return the result in an object.
    return {
      power: mbexpn,
      mbday: nextMBday
    };
  }



} //.class MathBirthdayCalculator


//****************************************************************************************************/

document.addEventListener('DOMContentLoaded',() => {

  const options = {
    DOMElementID: 'widget',
    startYear: 1900,
    endYear: 2016
  };

  const dateWidget = new DatePickerWidget(options);
  const mbCalculator = new MathBirthdayCalculator('mathbirthday', () => { return dateWidget.getDate(); } );


});




