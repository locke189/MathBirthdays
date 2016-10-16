console.log("JS Loaded");
/**  datepicker widget object  */
class DatePickerWidget {

  /**
  * Creates the Datepicker Widget
  *
  */
  constructor({DOMElementID, buttonText, startYear, endYear}){
    this.DOMElement = document.getElementById(DOMElementID);
    this.Id = DOMElementID;
    this.html = '';
    this.startYear = startYear;
    this.endYear = endYear;
    this.buttonText = buttonText;
    console.log(this.buttonText);
    this._createSelectionBoxes();
    this._createForm();

    this.month = new DatePickerMonth(`${this.Id}-widget-datepicker`);
    this.month.getDaysOfMonth();
    this.month.setHtml();

    //this._getDOMElements()

    /*
    //Initialization
    const today = new Date();
    today.setTime(today.getTime() - new Date().getTimezoneOffset()*60*1000);
    this.today = today;

    this.DOMInputDatePicker.valueAsDate = this.today;
    console.log(this.DOMInputYear);
    this.DOMInputYear.value = this.today.getFullYear();
    this.DOMInputMonth.value = this.monthsArray[today.getMonth()];
    this.cursor = today.getDate();
    */
  }

  /**
  * Creates a form to include all selection boxes
  *
  */
  _createForm(){

    this.html =
`     <form>
        <div class="container hidden-xs">
`;
    this.html += this.yearBoxHtml;
    this.html += this.monthBoxHtml;
    this.html += this.datePickerHtml;
    this.html += this.mobileFallbackHtml;

    this.html +=
`       </div> <!-- .container -->
      </form> <!-- form -->
`;


  }


  /**
  * Creates the selection boxes (year / Month)
  *
  */
  _createSelectionBoxes(){
    //Year Selection Box
    this.yearBoxHtml =
`
          <!--Year Selection Box-->
            <div class="row">
              <div class="col-lg-2 col-md-2 col-sm-4 no-padding-left no-padding-right">
                <div class="input-group">
                  <input type="number" id="${this.Id}-widget-year-input" class="form-control text-center dropdown-toggle"  min="${this.startYear}" max="${this.endYear}" aria-label="..." value="2012">
                  <div class="input-group-btn dropdown">
                    <button class="btn btn-default dropdown-toggle" type="button" id="${this.Id}-dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <span class="caret"></span>
                    </button>
                      <ul id="${this.Id}-widget-year-dropdown" class="dropdown-menu scrollable-menu" role="menu" aria-labelledby="dropdownMenu1">
                      </ul>
                  </div>
                </div>
              </div> <!-- col -->
            </div> <!-- row -->`;

    //Month Selection Box
    this.monthBoxHtml = `
            <!--Month Selection Box-->
            <div class="row">
              <div class="col-lg-2 col-md-2 col-sm-4 no-padding-left no-padding-right">
                <div class="input-group">
                  <input type="text" id="${this.Id}-widget-month-input" class="form-control text-center dropdown-toggle" readonly aria-label="...">
                  <span class="input-group-btn dropdown">
                    <button class="btn btn-default dropdown-toggle" type="button" id="${this.Id}-dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <span class="caret"></span>
                    </button>
                      <ul id="${this.Id}-widget-month-dropdown" class="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenu2">
                      </ul>
                  </span>
                </div>
              </div> <!-- col -->
            </div> <!-- row -->
`;

    this.datePickerHtml = `
            <!--Date selection-->
            <div id="${this.Id}-widget-datepicker" class="input-group row bottom-buffer"></div>
      `;

    //Fallback for mobile
    this.mobileFallbackHtml = `
          <!-- fallback -->
          <div class="container visible-xs bottom-buffer" >
            <div class="row">
              <p><input id="${this.Id}-widget-date-input" type="date" class="visible-xs col-xs-12 text-center" name="bday"></p>
            </div>
          </div> <!--end of fallback-->`;

  }

/**
* Creates DOM Element properties
*
*/
  _getDOMElements(){
    this.DOMInputYear = document.getElementById(`${this.Id}-widget-year-input`);
    this.DOMInputMonth = document.getElementById(`${this.Id}-widget-month-input`);
    this.DOMInputDatePicker = document.getElementById(`${this.Id}-widget-date-input`);
    this.DOMWidgetDatepicker = document.getElementById(`${this.Id}-widget-datepicker`);
    this.DOMDropdownMonth = document.getElementById(`${this.Id}-widget-year-dropdown`);
    this.DOMDropdownYear = document.getElementById(`${this.Id}-widget-month-dropdown`);
  }









/**
*   prints a button with a date in inner HTML of DOM Element
*
*   @param {DOMelement}, DOM element
*   @result {String}, date of the button.
*/
  _printDateButton(calendarDate){
    const text1 = '<button class="btn btn-default col-lg-1 col-md-1 col-sm-1 hidden-xs text-center" type="button"';
    const text2 = '><span aria-hidden="true">';
    const text3 = '</span></button>';
    this.DOMWidgetDatepicker.innerHTML += `${text1} id="date-${calendarDate}" ${text2 + calendarDate + text3}`;
  };

/**
*   prints a month in inner HTML of DOM Element
*
*   @param {DOMelement}, DOM element
*   @result {String}, date of the button.
*/
  _printMonthDays(){
    this.DOMWidgetDatepicker.innerHTML = ''
    for (let i = 1; i <= this._getFinalDayOfMonth(this.DOMInputYear.value,this.DOMInputMonth.value); i++) {
      this._printDateButton(i);
    }
    this._dateCallbackAssignment();
  };

}


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
    console.log("****")
    console.log(this.id);
  }

  /**
  * Creates the Datepicker Widget month
  * @param {Number} year, format YYYY
  * @param {Number} month, format MM
  */
  getDaysOfMonth(year = this.year, month = this.month){
    const finalDayOfMonth = this.getFinalDayOfMonth(year,month);
    let day = {};
    this.days = [];

    for(let i; i <= finalDayOfMonth; i++){
      day = {};
      day.html = getDateButtonHtml(i);
      day.id = `${this.id}-datebutton-${i}`;
      day.value = i;
      days.push(day)
    }

  }

  /**
  *   gets the final day of the month
  *
  *   @param {number} year,
  *   @param {number} Month,
  *   @result {number}, last day of the month.
  */
  getFinalDayOfMonth(year, month){
    var printMonth = new Date(year,month,1);
    printMonth.setMonth(printMonth.getMonth() + 1);
    printMonth.setDate(printMonth.getDate() - 1);
    return printMonth.getDate();
  };

  /**
  *   sets html for a given date
  *
  *   @param {DOMelement}, DOM element
  *   @result {String}, date of the button.
  */
  getDateButtonHtml(calendarDate){
    const text1 = `<button id="dp-datebutton-${calendardate}" class="btn btn-default col-lg-1 col-md-1 col-sm-1 hidden-xs text-center" type="button"`;
    const text2 = '><span aria-hidden="true">';
    const text3 = '</span></button>';
    return `${text1} id="date-${calendarDate}" ${text2 + calendarDate + text3}`;
  };


  setHtml(){
    this.html = '';
    this.days.forEach( day => this.html += day.html );
    this.DOMElement.innerHTML = this.html;
  };


}









/*

class DatePickerButtons{

}


/**
* Creates the Datepicker Widget
*

  _createButtonsMessage(){
    //Fallback for mobile
    console.log(this.buttonText);
    this.html += `
          <!-- Buttons and message-->
          <div class="container">
            <div class="row">
              <button  id="${this.Id}-widget-submit-button" class="btn btn-primary btn-lg col-xs-12" role="button">${this.buttonText}</button>
            </div>
            <div class="row">
              <div id="${this.Id}-alertmessage" class="alert alert-success hidden top-buffer bottom-buffer" role="alert"></div>
            </div><!--End of Buttons and message-->
          </div>`;

  this.DOMElement.innerHTML = this.html;
  }

*/




//****************************************************************************************************/

document.addEventListener("DOMContentLoaded",() => {

  const options = {
    DOMElementID: 'widget',
    buttonText: 'Test',
    startYear: 1900,
    endYear: 2016
  }

  const dateWidget = new DatePickerWidget(options);



})




