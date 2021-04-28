import { Card, Col, Radio } from 'antd'
import Toquery from '../components/toquery/toquery'
import { queryParam } from '../components/queryParams'
import React, { useState, useEffect, memo } from 'react'
import 'antd/dist/antd.css';

const TableList: React.FC<any> = memo((props: any) => {
  const onSubmit = (value: any) => {
    console.log(value)
  }
  return (
    <Card>
      <Toquery onSubmit={onSubmit} queryParamList={queryParam} bodyStyle={{ marginBottom: "10px" }} />
    </Card>
  )
})
export default TableList