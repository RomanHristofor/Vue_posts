<template>
  <div class="app-container">
    <h3>Post list</h3>
    <post-input
      v-model="searchTitle"
      placeholder="Search..."
    />
    <div class="app__btn">
      <post-button @click="showDialog">Create post</post-button>
      <post-filter
        v-model="selectedSort"
        :options="sortOptions"
      />
    </div>
    <post-dialog v-model:show="show">
      <post-form @create="createPost"/>
    </post-dialog>
    <TransitionGroup name="list">
      <post-list v-if="!isLoading" :posts="sortedByTitle" @remove="removePost"/>
      <h3 v-else>Loading...</h3>
    </TransitionGroup>
    <div class="pagination__wrap" >
      <div
        v-for="p in totalPages"
        :key="p"
        class="page"
        :class="{
          'current__page': p === page
        }"
        @click="changePage(p)"
      >
        {{ p }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import PostDialog from "@/components/UI/PostDialog.vue";
import PostFilter from "@/components/UI/PostFilter.vue";
import PostInput from "@/components/UI/PostInput.vue";
export default {
  components: {
    PostInput,
    PostFilter,
    PostDialog,
    PostList,
    PostForm,
  },
  data() {
    return {
      posts: [],
      show: false,
      isLoading: false,
      selectedSort: '',
      searchTitle: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {value: 'title', name: 'by title'},
        {value: 'body', name: 'by description'}
      ]
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.show = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.show = true;
    },
    changePage(p) {
      this.page = p;
    },
    async fetchPosts() {
      try {
        this.isLoading = true;
        setTimeout(async () => {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.page,
              _limit: this.limit
            }
          });
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
          this.posts = response.data;
          this.isLoading = false;
        }, 1000);
      } catch (e) {
        alert('Error get Posts')
      }
    }
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((p1, p2) => {
        return p1[this.selectedSort]?.localeCompare(p2[this.selectedSort])
      })
    },
    sortedByTitle() {
      return this.sortedPosts.filter((p) => p.title.toLowerCase().includes(this.searchTitle.toLowerCase()))
    }
  },
  watch: {
    page() {
      this.fetchPosts();
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  padding: 20px
}

.app__btn {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.pagination__wrap {
  display: flex;
  margin-top: 10px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current__page {
  border: 3px solid teal;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.list {
  transition: all 0.5s ease;
}
</style>
