import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLogin } from 'src/api/user';
import { StoreModel } from 'src/store';
import { login } from 'src/store/user.slice';

export default function Home() {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const user = useSelector((state: StoreModel) => state.user);
  const { mutateAsync, isLoading } = useLogin();

  const handleLogin = async () => {
    const a = await mutateAsync({
      password: '123456',
      phoneNumber: '123456'
    });
  };

  useEffect(() => {
    dispatch(
      login({
        email: 'abc@gmailcom',
        address: 'abc',
        name: 'abc',
        dateOfBirth: 'abc',
        phone: 'abc'
      })
    );
  }, [dispatch]);

  return (
    <>
      <div onClick={handleLogin}>hello</div>
      <h1 className='text-3xl font-bold underline text-red-400'>Hello world!</h1>
      <div className='mt-2'>
        <p>name: {user?.name}</p>
        <p>email: {user?.email}</p>
        <p>address: {user?.address}</p>
        <p>dateOfBirth: {user?.dateOfBirth}</p>
      </div>

      <Modal title='Basic Modal' open={isModalVisible} onOk={() => setIsModalVisible(false)}>
        <div></div>
      </Modal>
    </>
  );
}
