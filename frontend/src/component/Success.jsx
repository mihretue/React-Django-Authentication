import React from 'react'
import {Button, Result} from 'antd'

export default function Success() {
  return (
    <Result
    status="success"
    title="Successfully Registered"
    extra={[
        <Button type="success" key="console">
            Ok
        </Button>,

    ]}
  />
  )
}
