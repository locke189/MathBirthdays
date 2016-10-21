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
      this.year,
      this.month,
      this.today.getDate()
      );
    this._getDOMElements();
    this._addYearsToDropdown();
    this._addMonthsToDropdown();
  } // .constructor


  /**
  * Creates a form to include all selection boxes
  *
  */
  _createForm(){

    this.html =`
      <form>
        <div class="container hidden-xs">
        `;
    this.html += this.yearBoxHtml;
    this.html += this.monthBoxHtml;
    this.html += this.datePickerHtml;

    this.html +=`
        </div> <!-- .container -->
        `;

    this.html += this.mobileFallbackHtml;

    this.html +=`
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
                  <span class="input-group-btn dropdown">
                    <button class="btn btn-default dropdown-toggle" type="button" id="${this.id}-dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <span class="caret"></span>
                    </button>
                      <ul id="${this.id}-widget-month-dropdown" class="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenu2">
                      </ul>
                  </span>
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
      };
    });
  } // ._setMonthsCallback



} // end of class





/**  day buttons datepicker widget object  */
class DatePickerMonth {

  /**
  * Creates the Datepicker Widget month
  *
  */
  constructor(DOMElementID, year = 2016, month = 0, date = 1){
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

  changeDate(year, month){
    this.month = month;
    this.year = year;

    if( this.date >  this._getFinalDayOfMonth(year,month) ) {
      this.date = this._getFinalDayOfMonth(year,month);
    }


    this.html = '';
    this._getDaysOfMonth();
    this._setHtml();
    this._setDateCallbacks();
  }

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
    let day = {};
    this.days = [];
    for(let i = 1; i <= finalDayOfMonth; i++){
      day = {};
      day.html = this._getDateButtonHtml(i);
      day.id = `${this.id}-dp-datebutton-${i}`;
      day.DOM = document.getElementById(`${this.id}-dp-datebutton-${i}`);
      day.value = i;
      this.days.push(day);
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
    const text1 = `<button id="${this.id}-dp-datebutton-${calendarDate}" class="btn btn-default col-lg-1 col-md-1 col-sm-1 hidden-xs text-center" type="button"`;
    const text2 = '><span aria-hidden="true">';
    const text3 = '</span></button>';
    return `${text1} ${text2 + calendarDate + text3}`;
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
        if (element !== null)
          element.classList.remove('btn-success', `${this.id}`);
        day.DOM.classList.add('btn-success', `${this.id}`);
        this.date = day.value;
      };
    } );
  }

}






//****************************************************************************************************/

document.addEventListener('DOMContentLoaded',() => {

  const options = {
    DOMElementID: 'widget',
    buttonText: 'Test',
    startYear: 1900,
    endYear: 2016
  };

  const dateWidget = new DatePickerWidget(options);



});




