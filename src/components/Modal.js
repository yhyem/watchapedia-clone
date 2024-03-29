import React from 'react';
import styled from 'styled-components';

const ModalBlock = styled.div`
.modal {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  text-align: center;

  &>section {
    width: 26%;
    height: 640px;
    margin: 0 auto;
    border-radius: 5px;
    background-color: #ffffff;
    animation: 0.3s;
    overflow: hidden;

    &>header {
      position: relative;
      padding: 20px 30px;
      font-size: 30px;

      & button {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 30px;
        font-size: 21px;
        font-weight: 700;
        text-align: center;
        color: #696969;
        background-color: transparent;
      }
    }

    &>main {
      padding: 16px;
      border-bottom: 1px solid #dee2e6;
      border-top: 1px solid #dee2e6;
    }
  }

  &.openModal {
    display: flex;
    align-items: center;
    animation: 0.3s;
  }
}

.close {
  cursor: pointer;
  border: white;
}

@keyframes modal-show {
  from {
    opacity: 0;
    margin-top: -50px;
  }

  to {
    opacity: 1;
    margin-top: 0;
  }
}

@keyframes modal-bg-show {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
    
`

const Modal = (props) => {
  const { open, close, title } = props;

  return (
    <ModalBlock>
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            <header className='GmarketS'>
              {title}
              <button className="close" onClick={close}>
                &times;
              </button>
            </header>
            <div className='GmarketS'>{props.children}</div>
          </section>
        ) : null}
      </div>
    </ModalBlock>
  );
};

export default Modal;
