// package com.smartmealz.smart_mealz.repository;

// import com.smartmealz.smart_mealz.User;
// import org.springframework.data.jpa.repository.JpaRepository;

// public interface UserRepository extends JpaRepository<User, Long> {
//     User findByEmail(String email);
//     void deleteByEmail(String email);

// }


package com.smartmealz.smart_mealz.repository;

import com.smartmealz.smart_mealz.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Find by email
    public User findByEmail(String email) {
        String sql = "SELECT id, email, password FROM users WHERE email = ?";
        try {
            return jdbcTemplate.queryForObject(sql, new Object[]{email}, new RowMapper<User>() {
                @Override
                public User mapRow(ResultSet rs, int rowNum) throws SQLException {
                    return new User(
                            rs.getLong("id"),
                            rs.getString("email"),
                            rs.getString("password")
                    );
                }
            });
        } catch (Exception e) {
            return null; // Not found
        }
    }

    // Save new user
    public void save(User user) {
        String sql = "INSERT INTO users (email, password) VALUES (?, ?)";
        jdbcTemplate.update(sql, user.getEmail(), user.getPassword());

        // Set the user's ID after saving (so it can be used for cookies, etc.)
        Long id = jdbcTemplate.queryForObject("SELECT id FROM users WHERE email = ?", Long.class, user.getEmail());
        user.setId(id);
    }

    // ✅ DELETE by email (this was missing!)
    public void deleteByEmail(String email) {
        String sql = "DELETE FROM users WHERE email = ?";
        jdbcTemplate.update(sql, email);
    }
}