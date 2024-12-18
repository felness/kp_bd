package org.spring_boot.cp.bd.project.repository.user;

import org.spring_boot.cp.bd.project.entity.user.Role;
import org.spring_boot.cp.bd.project.entity.user.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserRowMapper implements RowMapper<User> {

    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        return User.createNew(
                rs.getInt("user_id"),
                rs.getString("username"),
                rs.getString("password_hash"),
                Role.valueOf(rs.getString("role").toUpperCase())


        );
    }
}
