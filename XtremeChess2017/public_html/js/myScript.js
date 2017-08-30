/*=======General variables========*/
var stringArray = ["A", "B", "C", "D", "E", "F", "G", "H"];
var numberArray = [1, 2, 3, 4, 5, 6, 7, 8];
var pawnArray = []; //"ToStoreDragggedPawnPieces"
var tiles;
var pieces;
var currentPiece;
var cuttingPiece;   //the one who gonna be cut another :-)
var currentParentTile;
var whiteDraggable;
var blackDraggable;
var piec;
var currID;
var letter;
var idNo;
var stringArrayPosition;
var numberArrayPosition;
/**/
/*==Loading animation==*/
$(window).on('load', function (eventData) {
    $("#div-loader").css("display", "none");
});
/*===Document Ready===*/
$(document).ready(function () {
    tiles = $(".square");
    pieces = $(".chessPiece");
    whiteDraggable = true;
    blackDraggable = false;
    alert('Welcome to ChessXtreme v1.0"\n"Start by dragging a white piece!');
});
/*=======================================================*/

/*======Hover functions========*/
$('.chessPiece').on('mouseover', function () {
    piec = $(this);
    if (!(piec.hasClass('pieceInDanger'))) {
        piec.addClass('chessPieceHover');
    }
}).on('mouseout', function () {
    if (piec.hasClass('chessPieceHover')) {
        piec.removeClass('chessPieceHover');
    }
});
/*=======Click functions=======*/
$('.chessPiece').click(function (eventData) {
    currentPiece = $(this);
    console.log("Clicked:" + currentPiece.attr('id'));
    if (!(currentPiece.hasClass('pieceInDanger'))) {
        doInitiate();//  :-)
        tiles.removeClass('pieceInDanger');
        pieces.removeClass('pieceInDanger');
        if (currentPiece.hasClass('white') && currentPiece.hasClass('pawn')) {
            if (whiteDraggable) {
                pathOfWhitePawn();
            }
        }
        if (currentPiece.hasClass('black') && currentPiece.hasClass('pawn')) {
            if (blackDraggable) {
                pathOfBlackPawn();
            }
        }
        if (currentPiece.hasClass('rock')) {
            if (whiteDraggable && currentPiece.hasClass('white')) {
                pathOfRock();
            } else if (blackDraggable && currentPiece.hasClass('black')) {
                pathOfRock();
            }
        }
        if (currentPiece.hasClass('knight')) {
            if (whiteDraggable && currentPiece.hasClass('white')) {
                pathOfKnight();
            } else if (blackDraggable && currentPiece.hasClass('black')) {
                pathOfKnight();
            }
        }
        if (currentPiece.hasClass('bishop')) {
            if (whiteDraggable && currentPiece.hasClass('white')) {
                pathOfBishop();
            } else if (blackDraggable && currentPiece.hasClass('black')) {
                pathOfBishop();
            }
        }
        if (currentPiece.hasClass('queen')) {
            if (whiteDraggable && currentPiece.hasClass('white')) {
                pathOfQueen();
            } else if (blackDraggable && currentPiece.hasClass('black')) {
                pathOfQueen();
            }
        }
    }
    /*============*/
    if (currentPiece.hasClass('king')) {
        doInitiate();
        tiles.removeClass('pieceInDanger');
        pieces.removeClass('pieceInDanger');
        if (whiteDraggable && currentPiece.hasClass('white')) {
            pathOfKing();
        } else if (blackDraggable && currentPiece.hasClass('black')) {
            pathOfKing();
        }
    }
    /*===========Cutting or removing ==> both black and white==============*/
    if ($(this).hasClass('pieceInDanger') && !($(this).hasClass('king'))) {
        var cSquare = $(this).parent();
        var currPiece = cuttingPiece;
        cSquare.html(currPiece);
        cSquare.append(currPiece);
        /*----*/
        tiles.removeClass('selectPath');
        pieces.removeClass('pieceHover');
        pieces.removeClass('pieceInDanger');
        tiles.removeClass('pieceInDanger');
        console.log(cSquare);
        console.log(currPiece);
        console.log('moved');
        /**/
        if (whiteDraggable && currPiece.hasClass('white')) {
            whiteDraggable = false;
            blackDraggable = true;
        } else if (blackDraggable && currPiece.hasClass('black')) {
            blackDraggable = false;
            whiteDraggable = true;
        }
        if (currentPiece.hasClass('pawn')) {
            changeToQueen(currentPiece);
        }
    }
});
/*==========dragging=============*/
$(".square").click(function () {
    var currSquare = $(this);
    var currPiece = $(".chessPiece.pieceHover");
    if ($(currSquare).hasClass('selectPath')) {
        if (currentPiece.hasClass('pawn') && (pawnArray.indexOf(currentPiece.attr('id')) === -1)) {
            pawnArray.push(currentPiece.attr('id').toString()); //add to pawn array
        }
        var currPieceId = currPiece.attr('id');
        currSquare.append(currPiece);/*moving the piece*/
        currSquare.removeClass('selectPath');
        tiles.removeClass('selectPath');
        pieces.removeClass('pieceHover');
        console.log("Last Clicked piece : " + currPieceId);
        /*--------*/
        tiles.removeClass('pieceInDanger');
        pieces.removeClass('pieceInDanger');
        /**/
        if (whiteDraggable && currPiece.hasClass('white')) {
            whiteDraggable = false;
            blackDraggable = true;
        } else if (blackDraggable && currPiece.hasClass('black')) {
            blackDraggable = false;
            whiteDraggable = true;
        }
    }
    if (currPiece.hasClass('pawn')) {
        changeToQueen(currPiece);
    }
});
/**/
//Mapping selectable paths for pieces
/**/
function pathOfWhitePawn(eventData) {
    var tempId = stringArray[stringArrayPosition] + numberArray[numberArrayPosition + 1];
    var tempIdSpecial = stringArray[stringArrayPosition] + numberArray[numberArrayPosition + 2];
    if (!($('#' + tempId + ' > div').hasClass('chessPiece'))) {
        $('*[id="' + tempId + '"]').addClass('selectPath');
        if ((pawnArray.indexOf(currentPiece.attr('id')) === -1) && !($('#' + tempIdSpecial + ' > div').hasClass('chessPiece'))) {
            $('*[id="' + tempIdSpecial + '"]').addClass('selectPath');
        }
        currentPiece.addClass('pieceHover');
        currentPiece.removeClass('selectPath');
        console.log('ID : ' + currID);
    }
    /*mark red*/
    var tempId1 = stringArray[stringArrayPosition + 1] + numberArray[numberArrayPosition + 1];
    if (($('#' + tempId1 + ' > div').hasClass('black')) && ($('#' + tempId1 + ' > div').hasClass('chessPiece'))) {
        $('#' + tempId1 + ' > div').addClass('pieceInDanger');
        $('*[id="' + tempId1 + '"]').addClass('pieceInDanger');
        cuttingPiece = currentPiece;
    }
    var tempId2 = stringArray[stringArrayPosition - 1] + numberArray[numberArrayPosition + 1];
    if (($('#' + tempId2 + ' > div').hasClass('black')) && ($('#' + tempId2 + ' > div').hasClass('chessPiece'))) {
        $('#' + tempId2 + ' > div').addClass('pieceInDanger');
        $('*[id="' + tempId2 + '"]').addClass('pieceInDanger');
        cuttingPiece = currentPiece;
    }
}
function pathOfBlackPawn(eventData) {
    var tempId = stringArray[stringArrayPosition] + numberArray[numberArrayPosition - 1];
    var tempIdSpecial = stringArray[stringArrayPosition] + numberArray[numberArrayPosition - 2];
    if (!($('#' + tempId + ' > div').hasClass('chessPiece'))) {
        $('*[id="' + tempId + '"]').addClass('selectPath');
        if ((pawnArray.indexOf(currentPiece.attr('id')) === -1) && !($('#' + tempIdSpecial + ' > div').hasClass('chessPiece'))) {
            $('*[id="' + tempIdSpecial + '"]').addClass('selectPath');
        }
        currentPiece.addClass('pieceHover');
        currentPiece.removeClass('selectPath');
        console.log(currID);
    }
    /*mark red*/
    var tempId1 = stringArray[stringArrayPosition + 1] + numberArray[numberArrayPosition - 1];
    if (($('#' + tempId1 + ' > div').hasClass('white')) && ($('#' + tempId1 + ' > div').hasClass('chessPiece'))) {
        $('#' + tempId1 + ' > div').addClass('pieceInDanger');
        $('*[id="' + tempId1 + '"]').addClass('pieceInDanger');
        cuttingPiece = currentPiece;
    }
    var tempId2 = stringArray[stringArrayPosition - 1] + numberArray[numberArrayPosition - 1];
    if (($('#' + tempId2 + ' > div').hasClass('white')) && ($('#' + tempId2 + ' > div').hasClass('chessPiece'))) {
        $('#' + tempId2 + ' > div').addClass('pieceInDanger');
        $('*[id="' + tempId2 + '"]').addClass('pieceInDanger');
        cuttingPiece = currentPiece;
    }
}
function pathOfRock(eventData) {
    var i = stringArrayPosition + 1;
    var j = numberArrayPosition;
    var tempId;
    for (; i < 8; i++) {/* ==>side */
        var tempId = stringArray[i] + numberArray[j];
        if (!($('#' + tempId + ' > div').hasClass('chessPiece'))) {
            $('*[id="' + tempId + '"]').addClass('selectPath');
            console.log(tempId);
            currentPiece.removeClass('selectPath');
            currentPiece.addClass('pieceHover');
        } else {
            break;
        }
    }
    markDanger(tempId);

    var i = stringArrayPosition - 1;
    var j = numberArrayPosition;
    for (; i >= 0; i--) {/* <==side */
        var tempId = stringArray[i] + numberArray[j];
        if (!($('#' + tempId + ' > div').hasClass('chessPiece'))) {
            $('*[id="' + tempId + '"]').addClass('selectPath');
            console.log(tempId);
            currentPiece.removeClass('selectPath');
            currentPiece.addClass('pieceHover');
        } else {
            break;
        }
    }
    markDanger(tempId);

    var i = stringArrayPosition;
    var j = numberArrayPosition + 1;
    for (; j < 8; j++) {/* /\side */
        var tempId = stringArray[i] + numberArray[j];
        if (!($('#' + tempId + ' > div').hasClass('chessPiece'))) {
            $('*[id="' + tempId + '"]').addClass('selectPath');
            console.log(tempId);
            currentPiece.removeClass('selectPath');
            currentPiece.addClass('pieceHover');
        } else {
            break;
        }
    }
    markDanger(tempId);

    var i = stringArrayPosition;
    var j = numberArrayPosition - 1;
    for (; j >= 0; j--) {/* \/side */
        var tempId = stringArray[i] + numberArray[j];
        if (!($('#' + tempId + ' > div').hasClass('chessPiece'))) {
            $('*[id="' + tempId + '"]').addClass('selectPath');
            console.log(tempId);
            currentPiece.removeClass('selectPath');
            currentPiece.addClass('pieceHover');
        } else {
            break;
        }
    }
    markDanger(tempId);
}
function pathOfKnight(eventData) {
    /**/
    var tempId1 = stringArray[stringArrayPosition + 1] + numberArray[numberArrayPosition + 2];
    knightMarkDanger(tempId1);
    var tempId1 = stringArray[stringArrayPosition - 1] + numberArray[numberArrayPosition + 2];
    knightMarkDanger(tempId1);
    var tempId1 = stringArray[stringArrayPosition + 2] + numberArray[numberArrayPosition + 1];
    knightMarkDanger(tempId1);
    var tempId1 = stringArray[stringArrayPosition - 2] + numberArray[numberArrayPosition + 1];
    knightMarkDanger(tempId1);
    /**/
    var tempId1 = stringArray[stringArrayPosition + 2] + numberArray[numberArrayPosition - 1];
    knightMarkDanger(tempId1);
    var tempId1 = stringArray[stringArrayPosition + 1] + numberArray[numberArrayPosition - 2];
    knightMarkDanger(tempId1);
    var tempId1 = stringArray[stringArrayPosition - 1] + numberArray[numberArrayPosition - 2];
    knightMarkDanger(tempId1);
    var tempId1 = stringArray[stringArrayPosition - 2] + numberArray[numberArrayPosition - 1];
    knightMarkDanger(tempId1);
    /**/
    currentPiece.removeClass('selectPath');
    currentPiece.addClass('pieceHover');
    console.log(currID);
}
function pathOfBishop(eventData) {
    var i = stringArrayPosition + 1;
    var j = numberArrayPosition;
    var tempId;
    L1:for (; i < 8; i++) {
        j++;
        var tempId = stringArray[i] + numberArray[j];
        if (!($('#' + tempId + ' > div').hasClass('chessPiece'))) {
            L2:for (; j < 8; j++) {
                $('*[id="' + tempId + '"]').addClass('selectPath');
                console.log(tempId);
                currentPiece.removeClass('selectPath');
                currentPiece.addClass('pieceHover');
                console.log(currID);
                break;
            }
        } else {
            break;
        }
    }
    markDanger(tempId);

    i = stringArrayPosition - 1;
    j = numberArrayPosition;
    L3:for (; i >= 0; i--) {
        j++;
        var tempId = stringArray[i] + numberArray[j];
        if (!($('#' + tempId + ' > div').hasClass('chessPiece'))) {
            L4:for (; j >= 0; j++) {
                $('*[id="' + tempId + '"]').addClass('selectPath');
                console.log(tempId);
                currentPiece.removeClass('selectPath');
                currentPiece.addClass('pieceHover');
                console.log(currID);
                break;
            }
        } else {
            break;
        }
    }
    markDanger(tempId);

    i = stringArrayPosition + 1;
    j = numberArrayPosition;
    L5:for (; i < 8; i++) {
        j--;
        var tempId = stringArray[i] + numberArray[j];
        if (!($('#' + tempId + ' > div').hasClass('chessPiece'))) {
            L6:for (; j >= 0; j--) {
                $('*[id="' + tempId + '"]').addClass('selectPath');
                console.log(tempId);
                currentPiece.removeClass('selectPath');
                currentPiece.addClass('pieceHover');
                console.log(currID);
                break;
            }
        } else {
            break;
        }
    }
    markDanger(tempId);

    i = stringArrayPosition - 1;
    j = numberArrayPosition;
    L7:for (; i >= 0; i--) {
        j--;
        var tempId = stringArray[i] + numberArray[j];
        if (!($('#' + tempId + ' > div').hasClass('chessPiece'))) {
            L8:for (; j >= 0; j--) {
                $('*[id="' + tempId + '"]').addClass('selectPath');
                console.log(tempId);
                currentPiece.removeClass('selectPath');
                currentPiece.addClass('pieceHover');
                console.log(currID);
                break;
            }
        } else {
            break;
        }
    }
    markDanger(tempId);
}
function pathOfQueen(eventData) {
    /*combination of rock and bishop*/
    pathOfRock();
    /**/
    pathOfBishop();
    /**/
}
function pathOfKing(eventData) {
    var tempId1 = stringArray[stringArrayPosition] + numberArray[numberArrayPosition + 1];
    kingMarkDanger(tempId1);
    var tempId1 = stringArray[stringArrayPosition + 1] + numberArray[numberArrayPosition + 1];
    kingMarkDanger(tempId1);
    var tempId1 = stringArray[stringArrayPosition + 1] + numberArray[numberArrayPosition];
    kingMarkDanger(tempId1);
    var tempId1 = stringArray[stringArrayPosition + 1] + numberArray[numberArrayPosition - 1];
    kingMarkDanger(tempId1);
    var tempId1 = stringArray[stringArrayPosition] + numberArray[numberArrayPosition - 1];
    kingMarkDanger(tempId1);
    var tempId1 = stringArray[stringArrayPosition - 1] + numberArray[numberArrayPosition - 1];
    kingMarkDanger(tempId1);
    var tempId1 = stringArray[stringArrayPosition - 1] + numberArray[numberArrayPosition];
    kingMarkDanger(tempId1);
    var tempId1 = stringArray[stringArrayPosition - 1] + numberArray[numberArrayPosition + 1];
    kingMarkDanger(tempId1);

    currentPiece.removeClass('selectPath');
    currentPiece.addClass('pieceHover');
    console.log(currID);
}
/*========================================*/

/*===============Methods==================*/
/*====Initiate piece paths====*/
function doInitiate(eventData) {
    tiles.removeClass("selectPath");
    pieces.removeClass("pieceHover");
    if (whiteDraggable && currentPiece.hasClass('white')) {
        currentPiece.addClass('pieceHover');
    } else if (blackDraggable && currentPiece.hasClass('black')) {
        currentPiece.addClass('pieceHover');
    }
    currID = currentPiece.parent().attr('id');
    letter = currID.charAt(0);
    idNo = currID.charAt(1);
    stringArrayPosition = ($.inArray(letter, stringArray));
    numberArrayPosition = ($.inArray(parseInt(idNo), numberArray));
}
/*===Rock, bishop and queen mark danger===*/
function markDanger(eventData) {
    var tempId = eventData;
    //for white
    if (($('#' + tempId + ' > div').hasClass('chessPiece')) && (currentPiece.hasClass('white')) && ($('#' + tempId + ' > div').hasClass('black'))) {
        $('#' + tempId + ' > div').addClass('pieceInDanger');
        $('*[id="' + tempId + '"]').addClass('pieceInDanger');
        cuttingPiece = currentPiece;
    }//for black
    if (($('#' + tempId + ' > div').hasClass('chessPiece')) && (currentPiece.hasClass('black')) && ($('#' + tempId + ' > div').hasClass('white'))) {
        $('#' + tempId + ' > div').addClass('pieceInDanger');
        $('*[id="' + tempId + '"]').addClass('pieceInDanger');
        cuttingPiece = currentPiece;
    }
}

/*===Knight mark danger===*/
function knightMarkDanger(eventData) {
    var temp = eventData;
    if (!($('#' + temp + ' > div').hasClass('chessPiece'))) {
        $('*[id="' + temp + '"]').addClass('selectPath');
    }//white
    if ((currentPiece.hasClass('white')) && ($('#' + temp + ' > div').hasClass('black'))) {
        $('#' + temp + ' > div').addClass('pieceInDanger');
        $('*[id="' + temp + '"]').addClass('pieceInDanger');
        cuttingPiece = currentPiece;
    }
    //black
    if ((currentPiece.hasClass('black')) && ($('#' + temp + ' > div').hasClass('white'))) {
        $('#' + temp + ' > div').addClass('pieceInDanger');
        $('*[id="' + temp + '"]').addClass('pieceInDanger');
        cuttingPiece = currentPiece;
    }
}
/*===King mark danger===*/
function kingMarkDanger(eventData) {
    var tempId1 = eventData;
    if (!($('#' + tempId1 + ' > div').hasClass('chessPiece'))) {
        $('*[id="' + tempId1 + '"]').addClass('selectPath');
    }//white
    if ((currentPiece.hasClass('white')) && ($('#' + tempId1 + ' > div').hasClass('black'))) {
        $('#' + tempId1 + ' > div').addClass('pieceInDanger');
        $('*[id="' + tempId1 + '"]').addClass('pieceInDanger');
        cuttingPiece = currentPiece;
    }
    //black
    if ((currentPiece.hasClass('black')) && ($('#' + tempId1 + ' > div').hasClass('white'))) {
        $('#' + tempId1 + ' > div').addClass('pieceInDanger');
        $('*[id="' + tempId1 + '"]').addClass('pieceInDanger');
        cuttingPiece = currentPiece;
    }
}
/*Pawn change to queen*/
function changeToQueen() {

}
