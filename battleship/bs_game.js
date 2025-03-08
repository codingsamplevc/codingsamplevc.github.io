const bs_game = {
  models: {
    carrier: 5,//[5,1], // [cells/vessel,vessels/model]
    battleship: 4,//[4,1],
    cruiser: 3,//[3,1],
    submarine: 3,//[3,2],
    destroyer: 2,//[2,2],
  },
  rules: {
    empty: ' ',
    occupied 'O',
    hit: '☼', // Dec: 9788, Hex: 263C / ⌀ 	DIAMETER SIGN (U+2300) 	e28c80 / ∅ 	EMPTY SET (U+2205) 	e28885 / ⃠ 	COMBINING ENCLOSING CIRCLE BACKSLASH (U+20E0) 	e283a0
    miss: 'X' // ↈ, U+2188, Encoded byte: e28688
    // ≈ 	ALMOST EQUAL TO (U+2248) 	e28988 / ≉ 	NOT ALMOST EQUAL TO (U+2249) 	e28989 / ≋ 	TRIPLE TILDE (U+224B) 	e2898b / ⎈ 	HELM SYMBOL (U+2388) 	e28e88 / ○ 	WHITE CIRCLE (U+25CB) 	e2978b / ◯ 	LARGE CIRCLE (U+25EF) 	e297af
    // ☼ 	WHITE SUN WITH RAYS (U+263C) 	e298bc / ⛭ 	GEAR WITHOUT HUB (U+26ED) 	e29bad / ⭖ 	HEAVY OVAL WITH OVAL INSIDE (U+2B56) 	e2ad96 / 〰 	WAVY DASH (U+3030) 	e380b0 / ꓳ 	LISU LETTER O (U+A4F3) 	ea93b3
    // 𐊒 	LYCIAN LETTER U (U+10292) 	f0908a92 / 𐊫 	CARIAN LETTER O (U+102AB) 	f0908aab / 𐌏 	OLD ITALIC LETTER O (U+1030F) 	f0908c8f / 𐓂 	OSAGE CAPITAL LETTER O (U+104C2) 	f0909382 /  	PHOENICIAN LETTER AIN (U+1090F) 	f090a48f
    // 𐩕 	KHAROSHTHI PUNCTUATION LOTUS (U+10A55) 	f090a995 / 𓈖 	EGYPTIAN HIEROGLYPH N035 (U+13216) 	f0938896 / 𓈗 	EGYPTIAN HIEROGLYPH N035A (U+13217) 	f0938897 / 
  },
  isShot: function(cell){ return cell === bs_game.rules.hit || cell === bs_game.rules.miss }, // True: hit or miss, False: empty or occupied
  isOccupied: function(cell){ return cell === bs_game.rules.occupied }, // True: occupied, False: empty (if 'isShot' is used first)

  
};
