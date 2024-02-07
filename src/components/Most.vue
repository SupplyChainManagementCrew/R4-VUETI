<template>
  <div>
    <h2>최다 판매 상품</h2>
    <table>
      <thead>
        <tr>
          <th class="border multiline">거 래 일</th>
          <th class="border multiline">수 령 인</th>
          <th class="border multiline">제 품 명</th>
          <th class="border multiline">주문 번호</th>
          <th class="border multiline">수 량</th>
          <th class="border multiline">단 가</th>
          <th class="border multiline">공 급 가</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in displayedItems" :key="index">
          <td class="border center">{{ item.TransactionDate }}</td>
          <td class="border center multiline">{{ item.Recipient }}</td>
          <td class="border center">{{ item.Item }}</td>
          <td class="border center multiline">{{ item.id }}</td>
          <td class="border center" style="white-space: nowrap;">{{ item.SalesQuantity }}개</td>
          <td class="border center">{{ formatCurrency(item.UnitPrice) }}</td>
          <td class="border center">{{ formatCurrency(item.totalValue) }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 0">Previous</button>
      <span>{{ currentPage + 1 }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages - 1">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const itemsPerPage = 5;
const currentPage = ref(0);
const db = ref([]);
const sortedDb = ref([]);

async function fetchData() {
  db.value = null;
  const res = await fetch(`https://r1-json-server.fly.dev/db`);
  db.value = await res.json();
  sortDbByTotalValue();
}

function calculateTotalValue(item) {
  const totalValue = item.SalesQuantity * item.UnitPrice;
  return totalValue;
}

function sortDbByTotalValue() {
  sortedDb.value = [...db.value].sort((a, b) => {
    return calculateTotalValue(b) - calculateTotalValue(a);
  });

  sortedDb.value.forEach(item => {
    item.totalValue = calculateTotalValue(item);
  });
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount);
}

onMounted(() => {
  fetchData();
});

const totalPages = computed(() => Math.ceil(sortedDb.value.length / itemsPerPage));

const displayedItems = computed(() => {
  const startIndex = currentPage.value * itemsPerPage;
  return sortedDb.value.slice(startIndex, startIndex + itemsPerPage);
});

function nextPage() {
  currentPage.value++;
}

function previousPage() {
  currentPage.value--;
}
</script>

<style scoped>
.border {
  border: 1px solid #ddd;
  padding: 8px;
}

.multiline {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.center {
  text-align: center;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}

.pagination button {
  margin: 0 5px;
}

th {
    padding: 20px;
    font-size: 17px;
    background-color: #d1cece;
  }


</style>
