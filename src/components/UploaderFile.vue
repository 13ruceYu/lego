<template>
  <div class="upload-file">
    <button @click="triggerUpload" :disabled="isUploading">
      <span v-if="isUploading">正在上传</span>
      <span v-else>点击上传</span>
    </button>
    <input
      type="file"
      ref="fileInput"
      :style="{ display: 'none' }"
      @change="handleFileChange"
    />
    <ul>
      <li
        :class="`uploaded-file upload-${file.status}`"
        v-for="file in uploadedFiles"
        :key="file.uid"
      >
        <span class="filename">{{ file.name }}</span>
        <button class="delete-icon" @click="removeFile(file.uid)">x</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { computed, defineComponent, reactive, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
export interface UploadFile {
  uid: string
  size: number
  name: string
  status: UploadStatus
  raw: File
}

export default defineComponent({
  name: 'UploadFile',
  props: {
    action: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const uploadedFiles = ref<UploadFile[]>([])
    const isUploading = computed(() => {
      return uploadedFiles.value.some((file) => file.status === 'loading')
    })

    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }

    const removeFile = (id: string) => {
      uploadedFiles.value = uploadedFiles.value.filter(
        (file) => file.uid !== id
      )
    }
    const handleFileChange = async (e: Event) => {
      const target = e.target as HTMLInputElement
      const files = target.files
      if (files) {
        const uploadedFile = files[0]
        const formData = new FormData()
        formData.append(uploadedFile.name, uploadedFile)
        const fileObj = reactive<UploadFile>({
          uid: uuidv4(),
          size: uploadedFile.size,
          name: uploadedFile.name,
          status: 'loading',
          raw: uploadedFile,
        })
        uploadedFiles.value.push(fileObj)
        try {
          const resp = await axios.post(props.action, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          console.log(resp.data)
          fileObj.status = 'success'
        } catch (error) {
          console.log(error)
          fileObj.status = 'error'
        } finally {
          fileInput.value && (fileInput.value.value = '')
        }
      }
    }

    return {
      fileInput,
      triggerUpload,
      handleFileChange,
      isUploading,
      uploadedFiles,
      removeFile,
    }
  },
})
</script>

<style scoped lang="less">
.upload {
  &-loading {
    color: yellow;
  }
  &-success {
    color: green;
  }
  &-error {
    color: red;
  }
}
</style>
