
/** 
 * This function is used to switch the color of the prio-button "urgent"
 */
function clickUrgentButton(){
let button = document.getElementById('prio-urgent');
let image = document.getElementById('prio-arrow-up');

button.classList.toggle('urgent-button-clicked');

if(image.src.match('/assets/img/prio-up.svg')){
    image.src = '/assets/img/prio-up-white.svg';
} else {
    image.src = '/assets/img/prio-up.svg'
}

}

/** 
 * This function is used to switch the color of the prio-button "urgent"
 */
function clickMediumButton(){
    let button = document.getElementById('prio-medium');
    let image = document.getElementById('prio-medium-equals');
    
    button.classList.toggle('medium-button-clicked');
    
    if(image.src.match('/assets/img/prio-up.svg')){
        image.src = '/assets/img/prio-up-white.svg';
    } else {
        image.src = '/assets/img/prio-up.svg'
    }
    
    }