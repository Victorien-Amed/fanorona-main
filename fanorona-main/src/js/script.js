let pos1 = document.querySelector('#first');
let pos2 = document.querySelector('#second');
let pos3 = document.querySelector('#third');
let pos4 = document.querySelector('#center-left');
let pos5 = document.querySelector('#center');
let pos6 = document.querySelector('#center-right');
let pos7 = document.querySelector('#fourth');
let pos8 = document.querySelector('#fifth');
let pos9 = document.querySelector('#sixth');

// var sounds
let piece_move_sound = document.querySelector('.piece-sound');
let invalid_move_sound = document.querySelector('.invalid-move-sound');
let winner_sound = document.querySelector('.win-sound')

let fanoronier = document.querySelector('.fanoronier');
let piece_p1 = [];
let piece_p2 = [];
let winner = document.querySelector('.winner');
let winner_player = document.querySelector('.winner strong');

let all_pos = [pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8, pos9];

let player1 = true; // true for player 1 and false for player 2
let pieces = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var nb_pieces = 0;
var cursor_id;

const img1 = "img_p1.png";
const img2 = "img_p2.png";

let old_id = null;
let id_old = null;
let mate = false;

for (let i = 0; i < all_pos.length; i++) {
    let pos = all_pos[i];

    // check if mate
    setInterval(() => {
        if (is_mate(piece_p1)) {
            winner.classList.remove('no-winner');
            winner_player.textContent = "nandefa 1 mandresy";
            fanoronier.classList.add("winner-fanoronier");
            disabled_pieces(all_pos);
            mate = true;
            winner_sound.play();
            setTimeout(() => {
                winner_sound.pause();
                winner_sound.currentTime = 0;
            }, 3000);
        } else if (is_mate(piece_p2)) {
            winner.classList.remove('no-winner');
            winner_player.textContent = "nandefa 2 nandresy";
            fanoronier.classList.add("winner-fanoronier");
            disabled_pieces(all_pos);
            mate = true;
            winner_sound.play();
            setTimeout(() => {
                winner_sound.pause();
                winner_sound.currentTime = 0;
            }, 3000);
        }
    }, 500);
    pos.addEventListener('click', (e) => {

        if (!mate) {
            if (cursor_id === undefined) {
                cursor_id = pos.id;
            }

            if (nb_pieces === 6) {
                if (old_id == null) {
                    if (pos.firstElementChild != null) {
                        old_id = pos.id;
                    }
                } else {
                    old_id = cursor_id;
                }
                if (pos.id != cursor_id) {
                    remove_cursor(all_pos);
                    cursor_id = pos.id;
                }


                if (pos.firstElementChild != null) {
                    pos.classList.toggle('choosen');
                    id_old = pos.id;
                } else {
                    let valid = validMove(cursor_id, old_id);
                    let choosed = get_piece_choosed(old_id, all_pos);
                    let arr_src = choosed != null ? choosed.src.split('/') : [];
                    // check if move is valid
                    if (valid) {

                        if (player1) {
                            // Add new piece for player 1
                            if (arr_src.includes(img1)) {
                                // update player 1 array of pieces
                                remove_id_choosed(old_id, all_pos, piece_p1);
                                piece_p1.push(pos.id);

                                // Delete old piece
                                choosed.parentNode.removeChild(choosed);
                                piece_1(pos);

                                player1 = false;

                                // Remove the last last-move
                                remove_last_move(all_pos);

                                // Add new last-move
                                pos.classList.add("last-move");

                                piece_move_sound.play();
                                setTimeout(() => {
                                    piece_move_sound.pause();
                                    piece_move_sound.currentTime = 0;
                                }, 500);
                            } else {
                                invalid_move_sound.play();
                                setTimeout(() => {
                                    invalid_move_sound.pause();
                                    invalid_move_sound.currentTime = 0;
                                }, 1000);
                            }

                        } else {
                            // Add new piece for player 2
                            if (arr_src.includes(img2)) {
                                // update player 2 array of pieces
                                remove_id_choosed(old_id, all_pos, piece_p2);
                                piece_p2.push(pos.id);

                                // Delete old piece
                                choosed.parentNode.removeChild(choosed);
                                piece_2(pos);
                                // if(id_old != null){
                                //     
                                // }
                                player1 = true;

                                // Remove the last last-move
                                remove_last_move(all_pos);

                                // Add new last-move
                                pos.classList.add("last-move");

                                piece_move_sound.play();
                                setTimeout(() => {
                                    piece_move_sound.pause();
                                    piece_move_sound.currentTime = 0;
                                }, 500);
                            } else {
                                invalid_move_sound.play();
                                setTimeout(() => {
                                    invalid_move_sound.pause();
                                    invalid_move_sound.currentTime = 0;
                                }, 1000);
                            }
                        }
                    } else {
                        invalid_move_sound.play();
                        setTimeout(() => {
                            invalid_move_sound.pause();
                            invalid_move_sound.currentTime = 0;
                        }, 1000);
                    }
                }

            }
            if (pos.firstElementChild == null && nb_pieces < 6) {
                // sound of pieces puttingg
                piece_move_sound.play();
                setTimeout(() => {
                    piece_move_sound.pause();
                    piece_move_sound.currentTime = 0;
                }, 500);

                if (player1) {
                    piece_1(pos);
                    piece_p1.push(pos.id);
                    player1 = false;
                } else {
                    piece_2(pos);
                    piece_p2.push(pos.id);
                    player1 = true;
                }
                nb_pieces++;
            }
        }
    });
}

// create red piece (player 1)
function piece_1(pos) {
    let p = document.createElement('img');
    p.src = "src/img/img_p1.png";
    pos.appendChild(p);
}

// create black piece (player 2)
function piece_2(pos) {
    let p = document.createElement('img');
    p.src = "src/img/img_p2.png";
    pos.appendChild(p);
}

// remove cursor
function remove_cursor(arr) {
    for (let j = 0; j < arr.length; j++) {
        if (arr[j].classList.contains("choosen")) {
            arr[j].classList.remove("choosen");
            break;
        }
    }
}

function get_piece_choosed(id, arr) {
    for (let k = 0; k < arr.length; k++) {
        if (arr[k].id === id) {
            return arr[k].firstElementChild;
        }
    }
    return null;
}

function remove_id_choosed(id, arr, arr_p) {
    let piece = get_piece_choosed(id, arr);
    let pos = piece.parentNode;
    for (let i = 0; i < arr_p.length; i++) {
        if (arr_p[i] == pos.id) {
            arr_p.splice(i, 1);
            break;
        }
    }
}

function remove_last_move(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].classList.contains('last-move')) {
            arr[i].classList.remove('last-move');
            break;
        }
    }
}

function validMove(new_id, old_id) {
    switch (old_id) {
        case "first":
            if (new_id === "second" || new_id === "center-left" || new_id === "center") {
                return true;
            } else {
                return false;
            }
        case "second":
            if (new_id === "first" || new_id === "third" || new_id === "center") {
                return true;
            } else {
                return false;
            }
        case "third":
            if (new_id === "second" || new_id === "center-right" || new_id === "center") {
                return true;
            } else {
                return false;
            }
        case "center-left":
            if (new_id === "first" || new_id === "fourth" || new_id === "center") {
                return true;
            } else {
                return false;
            }
        case "center-right":
            if (new_id === "third" || new_id === "sixth" || new_id === "center") {
                return true;
            } else {
                return false;
            }
        case "fourth":
            if (new_id === "center-left" || new_id === "fifth" || new_id === "center") {
                return true;
            } else {
                return false;
            }
        case "fifth":
            if (new_id === "fourth" || new_id === "sixth" || new_id === "center") {
                return true;
            } else {
                return false;
            }
        case "sixth":
            if (new_id === "fifth" || new_id === "center-right" || new_id === "center") {
                return true;
            } else {
                return false;
            }

        case "center":
            return true;
        default:
            return false;
    }
}


/**
 * check if mate
 */

function is_mate(arr) {
    if (arr.includes("first") && arr.includes("second") && arr.includes("third")) {
        return true;
    }
    if (arr.includes("first") && arr.includes("center-left") && arr.includes("fourth")) {
        return true;
    }
    if (arr.includes("first") && arr.includes("center") && arr.includes("sixth")) {
        return true;
    }
    if (arr.includes("third") && arr.includes("center-right") && arr.includes("sixth")) {
        return true;
    }
    if (arr.includes("fourth") && arr.includes("fifth") && arr.includes("sixth")) {
        return true;
    }
    if (arr.includes("third") && arr.includes("center") && arr.includes("fourth")) {
        return true;
    }
    if (arr.includes("second") && arr.includes("center") && arr.includes("fifth")) {
        return true;
    }
    if (arr.includes("center-left") && arr.includes("center") && arr.includes("center-right")) {
        return true;
    }

}

// Reload page

function refresh() {
    click_btn();
    setTimeout(() => {
        window.location.reload();
    }, 500);

}

// disabled all pieces
function disabled_pieces(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].disabled = true;
    }
}

function click_btn() {
    let btn_click = document.querySelector('.btn-click');
    btn_click.play();
}