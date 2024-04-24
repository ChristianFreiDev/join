
/** 
 * This function is used to switch the color of the prio-button "urgent"
 */
function clickUrgentButton(){
let button = document.getElementById('prio-urgent');
let arrow = document.getElementById('prio-arrow-up');

button.classList.toggle('urgent-button-clicked');

if(arrow.src.match('/assets/img/prio-up.svg')){
    arrow.src = '/assets/img/prio-up-white.svg';
} else {
    arrow.src = '/assets/img/prio-up.svg'
}

}