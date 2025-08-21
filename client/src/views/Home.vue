<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useBooksStore } from '@/stores/bookStore'
import BookCard from '@/components/books/BookCard.vue'
import BookForm from '@/components/books/BookForm.vue'

const authStore = useAuthStore()
const booksStore = useBooksStore()

const livros = ref([
  {
    id: 1,
    titulo: 'Shingeki no Kyojin',
    autor: 'Hajime Isayama',
    paginas: 300,
    ano: 2009,
    imagem: 'https://placehold.co/300x450/8B4513/FFF?text=Shingeki+no+Kyojin'
  },
  {
    id: 2,
    titulo: 'One Piece',
    autor: 'Eiichiro Oda',
    paginas: 200,
    ano: 1997,
    imagem: 'https://placehold.co/300x450/FF8C00/FFF?text=One+Piece'
  },
  {
    id: 3,
    titulo: 'Naruto',
    autor: 'Masashi Kishimoto',
    paginas: 250,
    ano: 1999,
    imagem: 'https://placehold.co/300x450/FFD700/333?text=Naruto'
  },
  {
    id: 4,
    titulo: 'Kimetsu no Yaiba',
    autor: 'Koyoharu Gotouge',
    paginas: 220,
    ano: 2016,
    imagem: 'https://placehold.co/300x450/DC143C/FFF?text=Kimetsu+no+Yaiba'
  },
  {
    id: 5,
    titulo: 'Jujutsu Kaisen',
    autor: 'Gege Akutami',
    paginas: 240,
    ano: 2018,
    imagem: 'https://placehold.co/300x450/4B0082/FFF?text=Jujutsu+Kaisen'
  },
  {
    id: 6,
    titulo: 'My Hero Academia',
    autor: 'Kohei Horikoshi',
    paginas: 230,
    ano: 2014,
    imagem: 'https://placehold.co/300x450/1E90FF/FFF?text=My+Hero+Academia'
  },
  {
    id: 7,
    titulo: 'Haikyuu!!',
    autor: 'Haruichi Furudate',
    paginas: 210,
    ano: 2012,
    imagem: 'https://placehold.co/300x450/FFA07A/FFF?text=Haikyuu!!'
  },
  {
    id: 8,
    titulo: 'Spy x Family',
    autor: 'Tatsuya Endo',
    paginas: 180,
    ano: 2019,
    imagem: 'https://placehold.co/300x450/2E8B57/FFF?text=Spy+x+Family'
  },
  {
    id: 9,
    titulo: 'Tokyo Revengers',
    autor: 'Ken Wakui',
    paginas: 200,
    ano: 2017,
    imagem: 'https://placehold.co/300x450/B22222/FFF?text=Tokyo+Revengers'
  },
  {
    id: 10,
    titulo: 'Chainsaw Man',
    autor: 'Tatsuki Fujimoto',
    paginas: 220,
    ano: 2018,
    imagem: 'https://placehold.co/300x450/000000/FFF?text=Chainsaw+Man'
  },
  {
    id: 11,
    titulo: 'Vinland Saga',
    autor: 'Makoto Yukimura',
    paginas: 260,
    ano: 2005,
    imagem: 'https://placehold.co/300x450/A0522D/FFF?text=Vinland+Saga'
  },
  {
    id: 12,
    titulo: 'Berserk',
    autor: 'Kentaro Miura',
    paginas: 350,
    ano: 1989,
    imagem: 'https://placehold.co/300x450/2F4F4F/FFF?text=Berserk'
  },
  {
    id: 13,
    titulo: 'Kaguya-sama: Love Is War',
    autor: 'Aka Akasaka',
    paginas: 200,
    ano: 2015,
    imagem: 'https://placehold.co/300x450/FF69B4/FFF?text=Kaguya-sama'
  },
  {
    id: 14,
    titulo: 'Fullmetal Alchemist',
    autor: 'Hiromu Arakawa',
    paginas: 280,
    ano: 2001,
    imagem: 'https://placehold.co/300x450/DAA520/333?text=Fullmetal'
  },
  {
    id: 15,
    titulo: 'Death Note',
    autor: 'Tsugumi Ohba',
    paginas: 200,
    ano: 2003,
    imagem: 'https://placehold.co/300x450/000000/FFF?text=Death+Note'
  },
  {
    id: 16,
    titulo: 'Bleach',
    autor: 'Tite Kubo',
    paginas: 230,
    ano: 2001,
    imagem: 'https://placehold.co/300x450/ADD8E6/333?text=Bleach'
  },
  {
    id: 17,
    titulo: 'One-Punch Man',
    autor: 'ONE',
    paginas: 150,
    ano: 2012,
    imagem: 'https://placehold.co/300x450/F4A460/FFF?text=One-Punch+Man'
  },
  {
    id: 18,
    titulo: 'Hunter x Hunter',
    autor: 'Yoshihiro Togashi',
    paginas: 240,
    ano: 1998,
    imagem: 'https://placehold.co/300x450/98FB98/333?text=Hunter+x+Hunter'
  },
  {
    id: 19,
    titulo: 'Black Clover',
    autor: 'Yūki Tabata',
    paginas: 210,
    ano: 2015,
    imagem: 'https://placehold.co/300x450/008000/FFF?text=Black+Clover'
  },
  {
    id: 20,
    titulo: 'Assassination Classroom',
    autor: 'Yūsei Matsui',
    paginas: 190,
    ano: 2012,
    imagem: 'https://placehold.co/300x450/8FBC8F/333?text=Assassination'
  },
])

const livrosFiltrados = computed(() => {
  const query = booksStore.searchQuery.toLowerCase()
  if (!query) {
    return livros.value
  }
  return livros.value.filter(livro =>
    livro.titulo.toLowerCase().includes(query) ||
    livro.autor.toLowerCase().includes(query)
  )
})

function salvarLivro(bookData) {
  const novoLivro = {
    ...bookData,
    id: Date.now(),
    imagem: `https://placehold.co/300x450/333/FFF?text=${encodeURIComponent(bookData.titulo)}`
  }
  
  livros.value.push(novoLivro)
  
  alert(`Livro "${bookData.titulo}" salvo com sucesso!`)
  authStore.closeAddItemModal()
}
</script>

<template>
  <div class="home-container">
    <h1>Mangás Disponíveis</h1>

    <div class="books-grid">
      <BookCard 
        v-for="livro in livrosFiltrados" 
        :key="livro.id" 
        :livro="livro" 
      />
      <p v-if="livrosFiltrados.length === 0">Nenhum mangá encontrado.</p>
    </div>

    <div v-if="authStore.isAddItemModalVisible" class="modal-overlay" @click="authStore.closeAddItemModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close-button" @click="authStore.closeAddItemModal">&times;</button>
        
        <BookForm 
          @submit="salvarLivro"
          @cancel="authStore.closeAddItemModal"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.home-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-top: 8rem;
  padding-bottom: 3rem;
  padding-left: 3rem;
  padding-right: 3rem;
  min-height: 100vh;
}

.home-container h1 {
  margin-bottom: 5rem;
  color: #fff;
  text-align: center;
  font-size: 4rem;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2.5rem;
}

:deep(.book-card-image) {
  width: 100%;
  height: 350px;
  object-fit: cover;
}

/* Onde a correção foi feita */
:deep(.book-card-title) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* <-- Versão antiga, para compatibilidade */
  line-clamp: 2; /* <-- Versão moderna, para navegadores atuais */
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 2.5rem;
  line-height: 1.25rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #888;
  z-index: 1001;
}

.modal-close-button:hover {
  color: #333;
}

p {
  text-align: center;
  font-size: 1.5rem;
  color: #fff;
  width: 100%;
}
</style>