import React from 'react';

class ColorsInfo extends React.Component {
    render(){

        return (
            <div className="container-description">
            <div className="container-description-item">
              <div style={{
    backgroundColor: this.props.colors.unavailable}} className="color"></div>
              <div className="is-occupied">Занято</div>
            </div>
            <div className="container-description-item">
              <div style={{
    backgroundColor: this.props.colors.selected}} className="color"></div>
              <div className="is-occupied">Выбрано</div>
            </div>
            <div className="container-description-item">
              <div style={{
    backgroundColor: this.props.colors.empty}} className="color"></div>
              <div className="is-occupied">Свободно</div>
            </div>
          </div>  
        )
    }
}

export default ColorsInfo;