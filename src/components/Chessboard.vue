<template>
  <div class="p-8 h-screen w-full flex items-center justify-center">
    <div class="grid grid-cols-8 grid-rows-8 bg-white w-2/3 h-full">
      <div v-for="piece in chessboard" :key="piece" class="text-center border border-black w-full">
        <button
          v-if="piece.type"
          @click="togglePiece(piece)"
          class="w-full h-full flex items-center justify-center"
          :class="[
            {
              'bg-sky-600': selectedPiece?.cell == piece.cell,
              'bg-red-600': possibleCaptures.includes(piece.cell)
            }
          ]"
        >
          <Pawn :is-black="piece.isBlack" />
        </button>
        <button
          v-if="possibleMoves.includes(piece.cell)"
          @click="movePiece(piece)"
          class="bg-sky-400 w-full h-full"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Pawn from './Piece/Pawn.vue'

const selectedPiece = ref({})
const possibleMoves = ref([])
const possibleCaptures = ref([])

const generateStartingPieces = (startCell, endCell, isBlack = false) => {
  let pieces = []
  for (let i = startCell; i < endCell; i++) {
    pieces.push({
      type: 'pawn',
      cell: i,
      isBlack: isBlack
    })
  }
  return pieces
}

const generateEmptyCells = (startCell, endCell) => {
  let cells = []
  for (let i = startCell; i < endCell; i++) {
    cells.push({
      cell: i
    })
  }
  return cells
}

const chessboard = computed(() =>
  generateStartingPieces(1, 17, true)
    .concat(generateEmptyCells(17, 49))
    .concat(generateStartingPieces(49, 65, false))
)

const togglePiece = (piece) => {
  if (possibleCaptures.value.includes(piece.cell)) {
    movePiece(piece)
    return
  }
  possibleCaptures.value = []
  if (selectedPiece.value.cell == piece.cell) {
    selectedPiece.value = {}
    possibleMoves.value = []
    return
  }

  selectedPiece.value = piece
  if (piece.isBlack && piece.cell < 58) {
    possibleMoves.value = [piece.cell + 8]
  } else if (!piece.isBlack && piece.cell > 8) {
    possibleMoves.value = [piece.cell - 8]
  }
  getPossibleCaptures(piece)
}

const getPossibleCaptures = (piece) => {
  if (!piece.isBlack) {
    if (piece.type == 'pawn') {
      let captureTarget = chessboard.value.find((item) => item.cell == piece.cell - 9)
      if (captureTarget) {
        if (captureTarget.type && captureTarget.isBlack) {
          possibleCaptures.value.push(captureTarget.cell)
        }
        captureTarget = chessboard.value.find((item) => item.cell == piece.cell - 7)
        if (captureTarget.type && captureTarget.isBlack) {
          possibleCaptures.value.push(captureTarget.cell)
        }
      }
    }
  }
}

const movePiece = (piece) => {
  let nextCellLocation = chessboard.value.find((item) => item.cell == piece.cell)
  nextCellLocation.type = selectedPiece.value.type
  nextCellLocation.isBlack = selectedPiece.value.isBlack

  let previousCellLocation = chessboard.value.find((item) => item.cell == selectedPiece.value.cell)
  previousCellLocation.type = null
  previousCellLocation.isBlack = null

  selectedPiece.value = {}
  possibleMoves.value = []
  possibleCaptures.value = []
}
</script>
