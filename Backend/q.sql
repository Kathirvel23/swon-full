SELECT r.code, a.phone FROM account a JOIN role_assignment ra ON ra.account_id=a.id JOIN role r ON r.id=ra.role_id WHERE UPPER(r.code) LIKE 'ADMIN%' LIMIT 5;
