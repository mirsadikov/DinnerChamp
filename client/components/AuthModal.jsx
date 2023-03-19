import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from '@/globalContext';
import axios from '../config/axios';
import { Alert } from '@mui/material';
import { Inter } from '@next/font/google';

const inter = Inter({
  subsets: ['latin'],
});

export default function AuthModal() {
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(30);

  const inputRef = useRef();
  const { authModalOpen, setAuthModalOpen, setAuth } = useContext(GlobalContext);

  useEffect(() => {
    if (isCodeSent) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => {
        clearTimeout(interval);
      };
    }
  }, [isCodeSent]);

  useEffect(() => {
    if (timer === 0) {
      setIsCodeSent(false);
      setTimer(30);
    }
  }, [timer]);

  const focusInput = () => {
    if (authModalOpen) inputRef.current.focus();
  };

  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      if (!code) {
        setError('Please enter code');
        return;
      }

      const { data } = await axios.post('/api/client/auth', { phone: number, code });

      if (data) {
        setAuthModalOpen(false);
        setNumber('');
        setCode('');
        setError('');
        setIsCodeSent(false);
        setTimer(30);
        setAuth({ token: data.token, number: data.number });
      }
    } catch (error) {
      setError(error);
    }
  };

  const requestCode = async (e) => {
    try {
      setError('');
      if (!number) {
        setError('Please enter your phone number');
        return;
      }

      if (isCodeSent) {
        alert(`Code already sent, try again in 30 seconds`);
        return;
      }

      await axios.post('/api/client/code', { phone: number });
      setIsCodeSent(true);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={authModalOpen}
      onClose={() => {
        setAuthModalOpen(false);
      }}
      closeAfterTransition
      className={`auth-modal ${inter.className}`}
    >
      <Fade in={authModalOpen} onTransitionEnd={focusInput}>
        <div className="auth-modal__container">
          <h2 className="auth-modal__title">Login to site</h2>
          <form className="auth-modal__form" onSubmit={handleAuth}>
            <label className="auth-modal__label" htmlFor="phone">
              Phone Number
            </label>
            <div className="auth-modal__input-container">
              <input
                id="phone"
                className="auth-modal__input"
                type="text"
                required
                placeholder="+998 90 123 45 67"
                ref={inputRef}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <button
                type="button"
                className="auth-modal__button auth-modal__button--inline"
                onClick={requestCode}
                disabled={isCodeSent}
              >
                Send Code
              </button>
            </div>
            {isCodeSent && (
              <div className="auth-modal__timer">
                <span>You can send code again in {timer} seconds</span>
              </div>
            )}
            <label className="auth-modal__label" htmlFor="code">
              Code
            </label>
            <div className="auth-modal__input-container">
              <input
                id="code"
                className="auth-modal__input"
                type="text"
                name="code"
                placeholder="123456"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <button type="submit" className="auth-modal__button">
              Confirm
            </button>
          </form>

          {error && (
            <div className="search-modal__error">
              <Alert severity="error">{error}</Alert>
            </div>
          )}
        </div>
      </Fade>
    </Modal>
  );
}
