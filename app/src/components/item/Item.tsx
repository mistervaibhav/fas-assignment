/* eslint-disable react-hooks/exhaustive-deps */
import './Item.scss';

const Item = ({ transition, item, lastItemRef }: any) => {
  const { id, name, nickName, picture } = item;

  return (
    <div ref={lastItemRef} className='item' style={{ transform: `translateX(-${transition}px)` }}>
      <div className='image-wrapper'>
        <img src={`${picture}${id}`} loading='lazy' alt='loading' />
      </div>
      <div className='item-content'>
        <p>
          Photo #{id} "{nickName}"
        </p>
        <p>By {name}</p>
      </div>
    </div>
  );
};

export default Item;
