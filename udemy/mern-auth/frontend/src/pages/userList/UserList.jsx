import React from "react";
import PageMenu from "../../components/pageMenu/PageMenu";
import UserStats from "../../components/userStats/UserStats";
import "./UserList.scss";
import { FaTrashAlt } from "react-icons/fa";
import ChangeRole from "../../components/changeRole/ChangeRole";
import Search from "../../components/search/Search";
const UserList = () => {
  return (
    <section>
      <div className="container">
        <PageMenu></PageMenu>
        <UserStats></UserStats>
        <div className="user-list">
          <div className="table">
            <div className="--flex-between">
              <span>
                <h3>All Users</h3>
              </span>
              <span>
                <Search></Search>
              </span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Change Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>BoBo</td>
                  <td>BoBo@gmail.com</td>
                  <td>Admin</td>
                  <td>
                    <ChangeRole></ChangeRole>
                  </td>
                  <td>
                    <span>
                      <FaTrashAlt size={20} color="red" />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserList;
