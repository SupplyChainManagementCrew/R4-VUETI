<template>
  <div>
    <h2>주문 목록</h2><br>
    <div>
      <input type="text" placeholder="검색어 입력" v-model="searchKeyword">
      <select name="search" v-model="selectedOption">
          <option value="">검색선택</option>
          <option value="cu">구매자</option>
          <option value="pr">제품</option>
      </select>
    </div><br>
    <div>
      <table border="1">
        <tr>
          <th class="center nowrap" style="min-width: 120px;">거래 날짜</th>
          <th class="center nowrap" style="min-width: 100px;">구매자</th>
          <th class="center nowrap" style="min-width: 150px;">물품</th>
          <th class="center nowrap" style="min-width: 100px;">판매 개수</th>
          <th class="center nowrap" style="min-width: 80px;">단가</th>
        </tr>
        <tr v-for="(item, index) in paginatedData" :key="index" class="table-row">
            <td class="center nowrap">{{ item.TransactionDate }}</td>
            <td class="center nowrap">{{ item.Recipient }}</td>
            <td class="center">{{ item.Item }}</td>
            <td class="center nowrap">{{ item.SalesQuantity }}개</td>
            <td class="center nowrap">{{ item.UnitPrice }}원</td>
        </tr>
      </table>
    </div>
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 0">Previous</button>
      <span>{{ currentPage + 1 }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages - 1">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const jsonData = ref([])
const searchKeyword = ref('')
const selectedOption = ref('') // 추가: 선택된 옵션을 저장할 변수
const currentPage = ref(0);

async function fetchData() {
    const response = await fetch("https://r1-json-server.fly.dev/db");
    jsonData.value = await response.json();
}

onMounted(() => {
    fetchData()
})

const filteredData = computed(() => {
    if (!searchKeyword.value) return jsonData.value;

    const keyword = searchKeyword.value.toLowerCase();
    
    return jsonData.value.filter(item => {
        // 선택된 옵션에 따라 검색 조건 변경
        const isMatch = (selectedOption.value === 'cu' && item.Recipient.toLowerCase().includes(keyword)) ||
                        (selectedOption.value === 'pr' && item.Item.toLowerCase().includes(keyword));
        
        return isMatch;
    });
});

const itemsPerPage = 5;

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage);
});

const paginatedData = computed(() => {
  const startIndex = currentPage.value * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredData.value.slice(startIndex, endIndex);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++;
  }
};

const previousPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
};
</script>

<style scoped>
.pagination {
  margin-top: 20px;
  text-align: center;
}

.pagination button {
  margin: 0 5px;
}

table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    text-align: center;
  }

  th {
    padding: 15px;
    border: 1px solid #dddddd;
    font-size: 18px;
    text-align: center;
    background-color: #d1cece;
  }

  td {
    padding: 10px;
    border: 1px solid #dddddd;
    text-align: center;
  }

.table-row {
  margin-bottom: 20px; /* 행 사이의 아래 여백 설정 */
  display: table-row; /* display 속성 설정 */
}

.center {
  text-align: center; /* 가운데 정렬 */
}

.nowrap {
  white-space: nowrap; /* 줄넘김 없음 */
}

</style>
