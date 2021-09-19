import React from 'react'
import { Spin } from 'antd';

const FullPageLoading = ({ opacity = 0.2, hidden = false }) => {
    return (<>
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: `${hidden ? `rgba(255,255,255,1)` : `rgba(0, 0, 0, ${opacity})`}` }}>
            <Spin size="large" />
        </div>
    </>)
}
export default FullPageLoading;