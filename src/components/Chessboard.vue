<template>
  <div class="p-8 h-screen w-full flex items-center justify-center">
    <div class="grid grid-cols-8 grid-rows-8 bg-white w-2/3 h-full">
      <div v-for="cell in cells" :key="cell" class="text-center border border-black w-full">
        <button
          v-if="showPiece(cell)"
          @click="togglePawn(cell)"
          class="w-full h-full flex items-center justify-center"
          :class="[{ 'bg-sky-600': selectedPawn?.cell == cell }]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1600"
            height="2560"
            version="1.0"
            viewBox="0 0 1200 1920"
            class="h-10"
            :class="[{ 'fill-emerald-500': !getPawn(cell).isBlack }]"
          >
            <path
              d="M573 241.1C477.4 249.5 390.6 301 337.6 381c-44.5 67-61.3 146.4-48 226.7 7.9 48.3 29 97.1 58.8 136.6 28.1 37.3 64 67.7 105.1 89.4l12 6.3h-77.2c-52.9 0-78.9.4-82.5 1.1-17.2 3.6-31.1 17.5-34.7 34.7-1.5 7.3-1.5 101.1 0 108.4 3.6 17.1 17.5 31 34.7 34.7 3.6.7 24.9 1.1 67.4 1.1h62.1l-.7 31.2c-3.6 164.1-29.9 301.4-80.7 421.3-9.6 22.7-31.4 65.8-43.7 86.2-28.7 47.7-64.1 91.4-94.7 117l-5 4.2H600l389.5.1-5.5-4.7c-9-7.5-33.9-33-42.9-43.8-18.8-22.6-39-51.6-55.1-79-10.2-17.5-31.5-60.2-39.9-80-50.8-119.7-77.1-257.1-80.7-421.3l-.7-31.2h62.1c41.8 0 63.8-.4 67.4-1.1 17.1-3.6 31-17.5 34.7-34.7 1.5-7.2 1.5-101 0-108.4-3.6-17.2-18.1-31.6-35-34.8-3.1-.6-36.4-1-82.3-1h-77.1l12-6.3c67.3-35.4 118.6-92.8 146.8-164.3 9.7-24.4 16.4-51.3 19.9-79.9 1.9-16.2 1.6-57.7-.5-73.5-5.2-37.3-14.2-67.3-29.7-98.9-35-71.3-92.8-125.1-166.2-154.6-44-17.8-96.1-25.6-143.8-21.4zM94.5 1741.4c-8.3 2-14.6 5.6-21.1 12-6.5 6.6-10.5 13.7-12.3 22.4-1.5 7.3-1.5 101.1 0 108.4 3.6 17.1 17.5 31 34.7 34.7 7.5 1.6 1000.8 1.6 1008.4 0 17.1-3.6 31-17.5 34.7-34.7 1.5-7.2 1.5-101 0-108.4-3.6-17.2-18.1-31.6-35-34.8-8.3-1.6-1003-1.2-1009.4.4z"
            />
          </svg>
        </button>
        <button
          v-if="possibleMoves.includes(cell)"
          @click="movePawn(cell)"
          class="bg-sky-400 w-full h-full"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const selectedPawn = ref({})
const possibleMoves = ref([])

const cells = computed(() => {
  let data = []
  for (let i = 1; i < 65; i++) {
    data.push(i)
  }
  return data
})

const getStartingPieces = (startCell, endCell, isBlack) => {
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

const chessboard = computed(() =>
  getStartingPieces(0, 17, true).concat(getStartingPieces(49, 65, false))
)

const showPiece = (cell) => {
  let pawn = getPawn(cell)
  if (pawn == undefined) {
    return false
  }
  return true
}

const getPawn = (cell) => {
  return chessboard.value.find((pawn) => pawn.cell == cell)
}

const togglePawn = (cell) => {
  let pawn = getPawn(cell)
  if (selectedPawn.value.cell == pawn.cell) {
    selectedPawn.value = {}
    possibleMoves.value = []
    return
  }
  selectedPawn.value = pawn

  if (pawn.isBlack && pawn.cell < 57) {
    possibleMoves.value = [pawn.cell + 8]
  } else if (!pawn.isBlack && pawn.cell > 8) {
    possibleMoves.value = [pawn.cell - 8]
  }
}

const movePawn = (cell) => {
  let pawn = chessboard.value.find((piece) => piece.cell == selectedPawn.value.cell)
  pawn.cell = cell
  selectedPawn.value = {}
  possibleMoves.value = []
}
</script>
