//Listner for calculation submit button
document.getElementById('loan-form').addEventListener('submit',  calculateResults);

//Caculate results
function calculateResults(e) {

    //UI variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal =  parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //Caculate monthly payment
    
    //x variable for number of periodic payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x-1);

    //If number is finite then do the calculation, otherwise show an error
    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    } else {
        showError("Please check your numbers");
    }
    e.preventDefault();
}

//Show the error
function showError(error) {

    //Select card and heading class
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading'); 
    
    //Create div
    const errorDiv = document.createElement('div');

    //Add the class
    errorDiv.className = 'alert alert-danger';

    //Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Place error above the heading
    card.insertBefore(errorDiv, heading);
    
    //Clear error after few seconds(milliseconds)
    setTimeout(clearError, 3000)
}

//Clear Error 
function clearError() {
    document.querySelector('.alert').remove();
}