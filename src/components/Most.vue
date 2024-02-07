<template>
  <div>
    <h2>Most Sold Product</h2>
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
        <tr v-for="item in sortedDb" :key="item.id">
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
  </div>
</template>

<style scoped>
.border {
  border: 1px solid #ddd; /* 표 선 스타일 및 색상 설정 */
  padding: 8px; /* 내부 여백 추가 */
}

.multiline {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.center {
  text-align: center; /* 가운데 정렬 설정 */
}
</style>


<script setup>
import { ref, onMounted } from 'vue';

const searchQuery = ref(''); // 양방향 검색 담을 그릇
const db = ref([]); // json 값 담을 그릇
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

// totalValue를 기준으로 내림차순 정렬
function sortDbByTotalValue() {
  sortedDb.value = [...db.value].sort((a, b) => {
    return calculateTotalValue(b) - calculateTotalValue(a);
  });

  // 정렬된 배열에 totalValue를 추가하여 화면 갱신 트리거
  sortedDb.value.forEach(item => {
    item.totalValue = calculateTotalValue(item);
  });
}

// Intl.NumberFormat을 사용하여 통화 형식으로 변환
function formatCurrency(amount) {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount);
}

onMounted(() => {
  fetchData();
});
</script>