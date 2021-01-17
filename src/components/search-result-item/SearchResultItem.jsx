import React, { Component } from 'react';
import { PushpinOutlined, TagOutlined } from '@ant-design/icons';
import './search-result-item.scss';

class SearchResultItem extends Component {
  render() {
    const { name, address, tags, distance } = this.props.result;
    const tagList = tags.split(',');
    return (
      <div className='search-result-item'>
        <div className='result-item__name'>
          <span>{name}</span>
          <span className='result-item__distance'>
            {distance.toFixed(2)} KM
          </span>
        </div>
        <div className='result-item__description'>
          <PushpinOutlined />
          <span>{address}</span>
        </div>
        <div>
          <TagOutlined />
          {tagList &&
            tagList.map((tag, index) => (
              <span className='tags' key={index}>
                {tag}
              </span>
            ))}
        </div>
      </div>
    );
  }
}

export default SearchResultItem;
