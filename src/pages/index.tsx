import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLogin } from 'src/api/user';
import { StoreModel } from 'src/store';
import { login } from 'src/store/user.slice';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const user = useSelector((state: StoreModel) => state.user);

  const handleChangeLanguage = () => {
    router.push('/', '/', { locale: router.locale === 'en' ? 'vi' : 'en' });
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
      <div onClick={() => setIsModalVisible(true)}>{t('hello')}</div>
      <div onClick={handleChangeLanguage}>{t('Change language')}</div>
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
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
}
