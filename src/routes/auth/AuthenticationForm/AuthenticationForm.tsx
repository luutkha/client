import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';
import globalAxios from '../../../configs/axios/axios';
import { saveUserDataToLocalStorage } from '../../../utils/functions';
import { useNavigate } from 'react-router-dom';
import {
  login
 } from "../../../features/auth/authSlice";
import { useAppDispatch } from '../../../app/hooks';
import ToastNotify from "../../../components/ToastNotify";

function AuthenticationForm(props: PaperProps) {
  const navigate = useNavigate()
  const [type, toggle] = useToggle(['login', 'register']);
  const dispatch = useAppDispatch()

  const isEmailRegisted = async (email: string) => {

    try {
      const resp = await globalAxios.post('http://localhost:3000/v1/users/check?email=' + email) as { isEmailExist: boolean }
      return resp.isEmailExist;
    } catch (error) {

    }

  }
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val: string) => {

        return (/^\S+@\S+$/.test(val) ? null : 'Invalid email')
      },
      password: (val: string | any[]) => (val.length <= 5 ? 'Password should include at least 6 characters' : null),
    },
  });

  const handleLogin = async () => {
    const { email, password } = form.values;
    try {
      const resp = await globalAxios.post('http://localhost:3000/v1/auth/login', {
        email,
        password
      })
      console.log(resp);
      saveUserDataToLocalStorage(resp);
      dispatch(login());
    ToastNotify("Successfully logged in");
      navigate("/")
    } catch (error:any) {
      form.setFieldError('password', error.response.data.message);

      console.log(error);
    }

  }

  const handleRegister = async () => {
    const { email, password, name } = form.values;
    try {
      const resp = await globalAxios.post('http://localhost:3000/v1/auth/register', {
        email,
        password,
        name
      })

      saveUserDataToLocalStorage(resp);
      navigate("/")
      dispatch(login());
    } catch (error:any) {
      console.log(error.response.data.errors[0].messages);
      form.setFieldError('email', error.response.data.errors[0].messages);


    }

  }
  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to Chat app, {type} with
      </Text>

      <form onSubmit={form.onSubmit(() => {

        if (type === 'login') {
          handleLogin();
        } else {
          handleRegister();
        }
      })}>
        <Stack>
          {type === 'register' && (
            <TextInput
              required
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password}
            radius="md"
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group mt="xl">
          <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}


export default AuthenticationForm;