const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let missCount = 0;

function round() {
  // (Done) FIXME: надо бы убрать "target" прежде чем искать новый
    $(".target").removeClass("target");
    $(".game-field").empty();
  
  let divSelector = randomDivId();
    
    $(divSelector).addClass("target");
    $(divSelector).text(hits+1);
  // (Done)TODO: помечать target текущим номером
    if (firstHitTime == 0) {
        firstHitTime  = new Date().getTime();
    } 
        // FIXME: (Done) тут надо определять при первом клике firstHitTime

    if (hits === maxHits) {
        endGame();
        }
    }

function endGame() {
    // (Done) FIXME: спрятать игровое поле сначала
    $(".game-field").hide();
  
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
    $("#total-time-played").text(totalPlayedSeconds);

    $("#win-message").removeClass("d-none");
  
  if (missCount > 0) {
        
    $("#total-miss").text(missCount);
    $("#miss-message").removeClass("d-none");
        }
    }

function handleClick(event) {

  // (Done)FIXME: убирать текст со старых таргетов. Кажется есть .text?
    if ($(event.target).hasClass("target")) {
        hits = hits + 1;
        $(".miss").removeClass("miss");
        round();
    }

    else {
        $(event.target).addClass("miss");
        round();
        missCount += 1; 
        }
  // (Done) TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
    }   
function startGame() {

    $(".game-field").removeClass("d-none");
    $("#button-reload").show();
    $("#button-start").hide();
    round();
 
    $(".game-field").click(handleClick);
    $("#button-reload").click(function() {
    
    location.reload();
        })
    }

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
        $("#button-reload").hide();
    $("#button-start").click(startGame);
        }

$(document).ready(init);
