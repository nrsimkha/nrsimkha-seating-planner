import React from 'react';
import "./Header.css";

class Header extends React.Component {
    render(){

        return (
            <div className="header">                
                
                    <div className="header_content">                      
                        <div className="header_icon_circle_img"></div>                                      
                        <div className="header_title">Рассадка гостей</div>
                    </div>
                    <div className="header_content header_content_column">
                        <div className="header_user_img"></div>                                      
                        <div className="header_user_text">Кекс и Крендель</div>
                    </div>
              
            </div>
        )
    }
}

export default Header;