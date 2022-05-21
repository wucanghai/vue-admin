import { defineComponent, reactive, ref } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useUsersStore } from '@/stores/users'
import { AxiosResponse, AxiosError } from 'axios'
import { useRouter } from 'vue-router'
// axios
import { login, LoginResponse } from '@/api/users'
import '@/view/login/index.scss'
export interface IRuleForm {
  username: string
  password: string
}
export default defineComponent({
  setup() {
    const usersStore = useUsersStore()
    const router = useRouter()

    const { updateUserToken, updateUserName } = usersStore
    const ruleFormRef = ref<FormInstance>()
    const ruleForm = reactive<IRuleForm>({
      username: 'patric',
      password: '123456'
    })

    // rules
    const rules = reactive<FormRules>({
      username: [{ required: true, message: 'Please input username', trigger: 'blur' }],
      password: { required: true, message: 'Please input password', trigger: 'blur' }
    })

    const btnLoading = ref<boolean>(false)

    const onSubmit = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate(async (valid, fields) => {
        btnLoading.value = true
        if (valid) {
          try {
            const res: AxiosResponse<LoginResponse> = await login({})
            const { user_token, username } = res.data.data
            updateUserToken(user_token)
            updateUserName(username)
            btnLoading.value = false
          } catch (error: any) {
            btnLoading.value = false
            const { message } = error
            ElMessage({ message: message, type: 'warning' })
          }
          // home
          router.push({ path: '/' })
        } else {
          console.log('error submit!', fields)
        }
      })
    }

    const onReset = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }

    return {
      ruleForm,
      onSubmit,
      onReset,
      ruleFormRef,
      rules,
      btnLoading
    }
  },
  render() {
    return (
      <div class={'login-form'}>
        <ElForm
          ref={'ruleFormRef'}
          inline={false}
          model={this.ruleForm}
          rules={this.rules}
          class={'login-form_content'}
          label-width={'80px'}
          size={'default'}
        >
          <ElFormItem label={'用户名'} prop={'username'}>
            <ElInput v-model={this.ruleForm.username} placeholder={'用户名'} />
          </ElFormItem>
          <ElFormItem label={'密码'} prop={'password'}>
            <ElInput v-model={this.ruleForm.password} placeholder={'密码'} type={'password'} />
          </ElFormItem>
          <ElFormItem>
            <ElButton
              loading={this.btnLoading}
              type={'primary'}
              onClick={() => {
                this.onSubmit(this.ruleFormRef)
              }}
            >
              登录
            </ElButton>
            <ElButton
              onClick={() => {
                this.onReset(this.ruleFormRef)
              }}
            >
              重置
            </ElButton>
          </ElFormItem>
        </ElForm>
      </div>
    )
  }
})
