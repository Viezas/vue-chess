import { test } from 'vitest';
import { getStartingPieces } from '@/components/Chessboard.vue'
import { movePiece } from '@/components/Chessboard.vue'

test('generate starting pawns for white player', ({ assert }) => {
    const startCell = 8;
    const endCell = 16;
    const isBlack = false;
  
    const expectedPieces = [
      { type: 'pawn', cell: 8, isBlack: false },
      { type: 'pawn', cell: 9, isBlack: false },
      { type: 'pawn', cell: 10, isBlack: false },
      { type: 'pawn', cell: 11, isBlack: false },
      { type: 'pawn', cell: 12, isBlack: false },
      { type: 'pawn', cell: 13, isBlack: false },
      { type: 'pawn', cell: 14, isBlack: false },
      { type: 'pawn', cell: 15, isBlack: false }
    ];
  
    assert(getStartingPieces(startCell, endCell, isBlack) === expectedPieces);
  });
  
  test('generate starting pawns for black player', ({ assert }) => {
    const startCell = 48;
    const endCell = 56; 
    const isBlack = true;
  
    const expectedPieces = [
      { type: 'pawn', cell: 48, isBlack: true },
      { type: 'pawn', cell: 49, isBlack: true },
      { type: 'pawn', cell: 50, isBlack: true },
      { type: 'pawn', cell: 51, isBlack: true },
      { type: 'pawn', cell: 52, isBlack: true },
      { type: 'pawn', cell: 53, isBlack: true },
      { type: 'pawn', cell: 54, isBlack: true },
      { type: 'pawn', cell: 55, isBlack: true }
    ];
  
    assert(getStartingPieces(startCell, endCell, isBlack) === expectedPieces);
  });

test('movePiece updates chessboard correctly', ({ assert }) => {
  const chessboard = {
    value: [
      { cell: 1, type: 'pawn', isBlack: false },
      { cell: 2, type: null, isBlack: null },
   ]
  };

  const selectedPiece = {
    value: { type: 'rook', cell: 2, isBlack: true }
  };

  movePiece(chessboard, selectedPiece);

  assert.equal(chessboard.value[1].type, 'rook');
  assert.equal(chessboard.value[1].isBlack, true);

  assert.equal(chessboard.value[2].type, null);
  assert.equal(chessboard.value[2].isBlack, null);

  assert.equal(selectedPiece.value.type, undefined);
  assert.equal(selectedPiece.value.cell, undefined);
  assert.equal(selectedPiece.value.isBlack, undefined);
});
