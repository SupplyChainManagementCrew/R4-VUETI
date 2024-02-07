<script setup>
import { ref, onMounted, computed } from 'vue'

const jsonData = ref([])
const searchKeyword = ref('')
const selectedOption = ref('') // 추가: 선택된 옵션을 저장할 변수

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
</script>

<template>
    <div>
        <input type="text" placeholder="검색어 입력" v-model="searchKeyword">
        <select name="search" v-model="selectedOption">
            <option value="">검색선택</option>
            <option value="cu">구매자</option>
            <option value="pr">제품</option>
        </select>
    </div><br>
    <div style="text-align: center; white-space: nowrap;">
        <table border="1" style="margin: auto; width: 80%;"> <!-- 테이블 전체 너비 조절 -->
            <tr>
                <th style="padding: 10px;">거래 날짜</th>
                <th style="padding: 10px;">구매자</th>
                <th style="padding: 10px;">물품</th>
                <th style="padding: 10px;">판매 개수</th>
                <th style="padding: 10px;">단가</th>
            </tr>
            <tr v-for="item in filteredData" :key="item.id">
                <td style="padding: 10px;">{{ item.TransactionDate }}</td>
                <td style="padding: 10px;">{{ item.Recipient }}</td>
                <td style="padding: 10px;">{{ item.Item }}</td>
                <td style="padding: 10px;">{{ item.SalesQuantity }}</td>
                <td style="padding: 10px;">{{ item.UnitPrice }}</td>
            </tr>
        </table>
    </div>
</template>
