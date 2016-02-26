/**
 * Created by Puki on 2016-02-26.
 */
var typeTd = 'black';
var pointStart1 = 20;
var pointStart2 = 20;

imgWhite = '<img src=' + 'images/white.png' + ' class="gameCoin">';
imgBlack = '<img src=' + 'images/black.png' + ' class="gameCoin">';

(function () {
    var table = "<table class='othelloBoard' >";
    for (var x = 1; x < 9; ++x) {
        table += '<tr>';
        for (var y = 1; y < 9; ++y) {
            table += '<td class=othelloSquare id=' + x + y + '>' + '</td>';
        }
    }
    table += " </table>";
    $('#othello').append(table);
})();

$('.othelloSquare').click(function () {

    if (!$(this).hasClass('black') && !$(this).hasClass('white')) {


        if (typeTd == 'black') {

            typeTd = 'white';
            if (checkClickedTd($(this))) {
                pickCoin($(this), imgWhite);
                changeCoin($(this), typeTd, 'black', imgWhite);
                points1($(this));
                $('.pointsOfPlayerTwo').addClass('animateAreaScore');
                $('.pointsOfPlayerOne').removeClass('animateAreaScore');
            }
        }
        else {
            typeTd = 'black';
            if (checkClickedTd($(this))) {
                pickCoin($(this), imgBlack);
                changeCoin($(this), typeTd, 'white', imgBlack);
                points2($(this));
                $('.pointsOfPlayerOne').addClass('animateAreaScore');
                $('.pointsOfPlayerTwo').removeClass('animateAreaScore');
            }
        }
    }


});
function checkClickedTd(clickedTd) {
    idClickedTd = clickedTd.attr('id');
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            var cordYclick = parseInt(idClickedTd.charAt(0)),
                cordXclick = parseInt(idClickedTd.charAt(1)),
                cordX = cordXclick + (j),
                cordY = cordYclick + (i),
                cordsXY = '#' + cordY + cordX;

            if ($(cordsXY).hasClass('white') || $(cordsXY).hasClass('black')) {
                return true;
            }
        }
    }


}
function pickCoin(clickedId, imgCoin) {
    var idClickedTd = clickedId.attr('id');
    $('#' + idClickedTd).html(imgCoin).addClass(typeTd);

}
function changeCoin(clickedId, classTd, classChange, typeImg) {
    var coinToChange = [];
    for (var cordYnextTd = -1; cordYnextTd <= 1; cordYnextTd++) {
        for (var cordXnextTd = -1; cordXnextTd <= 1; cordXnextTd++) {
            idClickedTd = clickedId.attr('id');
            var cordYclick = parseInt(idClickedTd.charAt(0)),
                cordXclick = parseInt(idClickedTd.charAt(1));
            while (true) {
                if (cordYnextTd == 0 && cordXnextTd == 0) {
                    break;
                }
                cordXclick = cordXclick + (cordXnextTd);
                cordYclick = cordYclick + (cordYnextTd);
                var cordsXY = '#' + cordYclick + cordXclick;

                if ($(cordsXY).hasClass('black') || $(cordsXY).hasClass('white')) {
                    if ($(cordsXY).hasClass(classTd)) {

                        if (coinToChange.length > 0) {

                            for (var arrayLength = 0; arrayLength < coinToChange.length; arrayLength++) {
                                $(coinToChange[arrayLength]).removeClass(classChange);
                                $(coinToChange[arrayLength]).addClass(classTd);
                                $(coinToChange[arrayLength]).html(typeImg);


                                if ($(cordsXY).hasClass('white')) {
                                    pointStart1 = pointStart1 + 10;
                                    $('.areaPoints1').html(pointStart1.toFixed(0));
                                    pointStart2 = pointStart2 - 10;
                                    $('.areaPoints2').html(pointStart2.toFixed(0));
                                }

                                if ($(cordsXY).hasClass('black')) {
                                    pointStart2 = pointStart2 + 10;
                                    $('.areaPoints2').html(pointStart2.toFixed(0));
                                    pointStart1 = pointStart1 - 10;
                                    $('.areaPoints1').html(pointStart1.toFixed(0));
                                }

                            }
                            coinToChange = [];
                        }
                    } else if (($(cordsXY).hasClass('black') || $(cordsXY).hasClass('white')) && $(cordsXY).hasClass(classChange)) {
                        coinToChange.push(cordsXY);

                    }

                } else {
                    coinToChange = [];
                    break
                }
            }
        }
    }


}

function startGame() {
    typeTd = 'black';
    $('.pointsOfPlayerOne').removeClass('animateAreaScore');
    $('.pointsOfPlayerTwo').removeClass('animateAreaScore');
    $('.pointsOfPlayerOne').addClass('animateAreaScore');

    $('.othelloSquare').removeClass('black white').html('');
    pointStart1 = 20;
    pointStart2 = 20;
    $('.areaPoints1').html(pointStart1);
    $('.areaPoints2').html(pointStart2);

    $('#player1').html('player 1' + '<img src=' + 'images/white.png' + ' class="playerIcon">');
    $('#player2').html('player 2' + '<img src=' + 'images/black.png' + ' class="playerIcon">');

    $('.exchangeRateTable').css('visibility', 'visible');
    $('.pointsOfPlayerOne').css('visibility', 'visible');
    $('.pointsOfPlayerTwo').css('visibility', 'visible');

    $('#44').html(imgBlack).addClass('black');

    $('#54').html(imgBlack).addClass('black');

    $('#45').html(imgWhite).addClass('white');

    $('#55').html(imgWhite).addClass('white');

    $('#gameTextContener').removeClass('stopGameTexts');
    $('#gameTextContener p').addClass('startGameTexts');
    setTimeout(function () {
        $('#gameTextContener p').removeClass('startGameTexts');
        $('#gameTextContener').addClass('stopGameTexts');
    }, 3200);
}
function points1() {
    pointStart1 = pointStart1 + 10;
    $('.areaPoints1').html(pointStart1.toFixed(0));

};

function points2() {
    pointStart2 = pointStart2 + 10;
    $('.areaPoints2').html(pointStart2.toFixed(0));
};


$("#startOthelloButton").click(function () {
    document.getElementById("startOthelloButton").style.display = "none";

    document.getElementById("resetOthelloButton").style.display = "inline";
    startGame();
});

$('#resetOthelloButton').click(function () {
    startGame();
});
