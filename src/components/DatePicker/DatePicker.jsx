import React, { useState } from "react";
import { DatePicker, TimePicker, Select, Space } from "antd";
import { Typography } from "@material-ui/core";

const { Option } = Select;

function PickerWithType({ type, onChange, style }) {
  if (type === "time") return <TimePicker onChange={onChange} />;
  if (type === "date") return <DatePicker onChange={onChange} />;
  return <DatePicker picker={type} onChange={onChange} style={style} />;
}

function SwitchablePicker() {
  const [type, setType] = useState("month");
  return (
    <>
      <Typography>Filter :</Typography>
      <Space>
        <Select value={type} onChange={setType}>
          <Option value="month">Bulan</Option>
          <Option value="year">Year</Option>
        </Select>

        <PickerWithType
          type={type}
          onChange={(value) => console.log(value)}
          style={{ width: "100%" }}
        />
      </Space>
    </>
  );
}

export default SwitchablePicker;
