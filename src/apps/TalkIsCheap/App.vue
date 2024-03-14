<script setup lang="ts">
import {
    NConfigProvider,
    NLayout,
    NLayoutContent,
    NLayoutHeader,
    NLayoutFooter,
    NSpace,
    NButton,
    NList,
    NListItem,
    NUpload,
    UploadCustomRequestOptions
    // useLoadingBar,
    // NLoadingBarProvider
} from 'naive-ui'
// theme
import { createTheme, inputDark, datePickerDark } from 'naive-ui'
// locale & dateLocale
import { zhCN, dateZhCN } from 'naive-ui'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";
import firebaseConfig from '../../../firebase.config.json';
import { addDocument, getDocument, uploadFileByBytes, listAllImages } from '../../utils/firebase';
import { nextTick, onMounted, ref, watchEffect } from 'vue';
import { codeToHtml } from 'shiki'

const darkTheme = createTheme([inputDark, datePickerDark]);


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
logEvent(analytics, 'page_view')
const db = getFirestore(app);

// const loading = useLoadingBar()

interface CodeEntity {
    code: string;
    lang: string;
    theme: string;
    id: string;
    _id?: string;// 数据库唯一id
}

const codeList = ref<CodeEntity[]>([])

onMounted(() => {
    listAllImages()
    onTestFireBaseGet()
})

const onTestFireBaseAdd = async () => {
    // loading.start()
    const res = await addDocument(db, {
        entity: 'code',
        entityObj: {
            code: `console.log("Talk is cheap, show me your code!")`,
            lang: 'javascript',
            theme: 'vitesse-dark',
            id: Date.now().toString()
        }
    })
    console.log(res);
    // loading.finish()
}

const onTestFireBaseGet = async () => {
    // loading.start()
    codeList.value = await getDocument<CodeEntity>(db, { entity: 'code' })
    // loading.finish()
    console.log(codeList.value);
    refreshCodeView()
}

const getHTMLOfCode = async ({ code, lang, theme }: CodeEntity) => {
    return await codeToHtml(code, { lang, theme })
}
const refreshCodeView = () => {
    nextTick(() => {
        codeList.value.forEach(async item => {
            console.log(item);
            const codeEl = document.body.querySelector(`#code_${item.id}`)!;
            codeEl.innerHTML = (await getHTMLOfCode(item));
        })
    })
}

const customRequest = async ({ file }: UploadCustomRequestOptions) => {
    console.log(file);
    const res = await uploadFileByBytes(file.file!, file.name)
    console.log(res);
}
</script>

<template>
    <div class="h-full flex-1">
        <n-config-provider :theme="darkTheme" :locale="zhCN" :date-locale="dateZhCN">
            <n-upload :custom-request="customRequest">
                <n-button>上传文件</n-button>
            </n-upload>
            <n-space vertical size="large">
                <n-layout>
                    <n-layout-header>
                        <h1 class="text-center text-12">
                            Talk is Cheap
                        </h1>
                    </n-layout-header>
                    <n-layout-content content-style="padding: 24px;">
                        <n-space>
                            <n-button @click="onTestFireBaseAdd">Test Add Document of Firebase</n-button>
                            <n-button @click="onTestFireBaseGet">Test Get Document of Firebase</n-button>
                        </n-space>
                        <n-list>
                            <n-list-item v-for="(item) in codeList" :key="item.id">
                                <div :id="`code_${item.id}`" class="w-full" style="min-height: 300px;"></div>
                            </n-list-item>
                        </n-list>
                    </n-layout-content>
                    <n-layout-footer>
                        <footer class="text-center p-4">
                            @pengfei yuan
                        </footer>
                    </n-layout-footer>
                </n-layout>
            </n-space>
        </n-config-provider>
    </div>
</template>

<style lang="less" scoped></style>