document.addEventListener("DOMContentLoaded",() => {
    // Give us access to the table
    let mytable = document.querySelector('#mytable');
    let current_player = document.querySelector('#curr_play');
    // Get the top hands
    let hands = mytable.rows[0].cells;
    // Define all controls
    let controls = [];
    for (let i = 6; i >= 1; i--) controls.push(mytable.rows[i].cells);
    // Game variables
    let firstPlayer = true;
    let player_char = () => { return (firstPlayer) ? "one" : "two"; }
    let player_cirle = () => { return (firstPlayer) ? "🔴" : "🟡"; }
    let toggle_player = () => { firstPlayer = !firstPlayer; }
    let finish_game = () => { game_finished = true; };
    let announce_winner = () => { current_player.innerText = player_cirle()+" wins!"}
    let game_finished = false;
    // Create the game map
    let game_map = [];
    for (let i = 0; i < 7; i++) {
	game_map.push([]);
	for (let j = 0; j < 6; j++)
	    game_map[i].push("");
    }
    // Adding hand listeners
    for (let i = 0; i < 7; i++) {
	hands[i].addEventListener('mouseenter', () => { hands[i].innerText = "✋"; });
	hands[i].addEventListener('mouseleave', () => { hands[i].innerText = "✊"; });
	hands[i].addEventListener('click', () => { drop(i) });
    }
    // Utility functions
    let height = (column) => {
	let count = 0;
	for (let e of game_map[column]) if (e != "") count++;
	return count
    }
    let drop = (column) => {
	if (game_finished) return;
	let column_height = height(column);
	if (column_height > 5) return;
	game_map[column][column_height] = player_char();
	controls[column_height][column].innerText = player_cirle();
	if (check_board()) {
	    finish_game();
	    announce_winner();
	    return;
	};
	toggle_player();
	current_player.innerText = "Current player: "+player_cirle();
    }
    let check_board = () => {
	let player = player_char();
	let up = (column, row) => {
	    if (row - 3 < 0) return false;
	    let count = 0;
	    for (i = 0; i < 4; i++) if (game_map[column][row-i]==player) count++;
	    return count >= 4;
	}
	let down = (column, row) => {
	    if (row + 3 > 5) return false;
	    let count = 0;
	    for (i = 0; i < 4; i++) if (game_map[column][row+i]==player) count++;
	    return count >= 4;
	}
	let left = (column, row) => {
	    if (column - 3 < 0) return false;
	    let count = 0;
	    for (i = 0; i < 4; i++) if (game_map[column-i][row]==player) count++;
	    return count >= 4;
	}
	let right = (column, row) => {
	    if (column + 3 > 6) return false;
	    let count = 0;
	    for (i = 0; i < 4; i++) if (game_map[column+i][row]==player) count++;
	    return count >= 4;
	}
	let up_left = (column, row) => {
	    if (column - 3 < 0 || row - 3 < 0) return false;
	    let count = 0;
	    for (i = 0; i < 4; i++) if (game_map[column-i][row-i]==player) count++;
	    return count >= 4;
	}
	let up_right = (column, row) => {
	    if (column + 3 > 6 || row - 3 < 0) return false;
	    let count = 0;
	    for (i = 0; i < 4; i++) if (game_map[column+i][row-i]==player) count++;
	    return count >= 4;
	}
	let down_left = (column, row) => {
	    if (column - 3 < 0 || row + 3 > 5) return false;
	    let count = 0;
	    for (i = 0; i < 4; i++) if (game_map[column-i][row+i]==player) count++;
	    return count >= 4;
	}
	let down_right = (column, row) => {
	    if (column + 3 > 6 || row + 3 > 5) return false;
	    let count = 0;
	    for (i = 0; i < 4; i++) if (game_map[column+i][row+i]==player) count++;
	    return count >= 4;
	}
	for (let i = 0; i < 7; i++) {
	    for (let j = 0; j < 6; j++) {
		if (game_map[i][j] != player) continue;
		if (up(i,j)||down(i,j)||
		    left(i,j)||right(i,j)||
		    up_left(i,j)||up_right(i,j)||
		    down_left(i,j)||down_right(i,j))
		    return true;
	    }
	}
	return false;
    }
});
