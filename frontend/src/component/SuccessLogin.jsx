import React from 'react'
import { Result, Button } from 'antd'

export default function SuccessLogin() {
  return (
    <Result
    status="success"
    title="Successfully Logged In"
    extra={[
        <Button type="success" key="console">
            Ok
        </Button>,

    ]}
  />
  )
}
