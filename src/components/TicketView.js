import React from "react";
import Lottie from "@amelix/react-lottie";
import { successOptions } from "@/utils";
import { Card } from "antd";
import { Popconfirm } from "antd";
import { Modal, Divider } from "antd";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Badge,
  Space,
  Tag,
  message,
  Empty,
} from "antd";
import { useState } from "react";
import TicketService from "@/services/TicketService";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  DeleteTwoTone,
} from "@ant-design/icons";
import { ticketService } from "@/services/Instances";
import TicketSection from "./TicketSection";



export default function TicketView({tickets, setTickets}) {
  const unresolvedTickets = tickets.filter(ticket => ticket.status == 'unresolved');
  const inProgressTickets = tickets.filter(ticket => ticket.status == 'in-progress');
  const resolvedTickets = tickets.filter(ticket => ticket.status == 'resolved');


  return (
    <div>
      <TicketSection tickets={unresolvedTickets} title={"Unresolved Tickets"} setTickets={setTickets}/> 
      <TicketSection tickets={inProgressTickets} title={"In Progress Tickets"} setTickets={setTickets}/> 
      <TicketSection tickets={resolvedTickets} title={"Resolved Tickets"} setTickets={setTickets}/> 
    </div>
  )

}