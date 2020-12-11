<template>
  <div class="about container">
    <h1 class="mb-3 border-bottom border-dark">Task</h1>
    <p>
      You need to create simple banking system. Create a Database 'Bank' with 2
      tables user & accounts. Users table will have all users(bankers &
      customers). Accounts table will have all the entries of cash deposited &
      withdrawn.
    </p>
    <ol>
      <li>
        Customer Login
        <ul>
          <li>
            Go to accounts page see all his/her transaction records
          </li>
          <li>Transaction page withdraw or deposit option</li>
          <li>select any option</li>
          <li>Enter the amount</li>
          <li>
            Withdraw will deduct the amount & deposit will add to the balance
            amount. If amount entered is greater than the balance for withdrawal
            show message "No sufficient Fund"
          </li>
        </ul>
      </li>
      <li>
        Banker Login
        <ul>
          <li>See total balance amount against all users</li>
          <li>Click on particular user & show his/her transactions</li>
        </ul>
      </li>
    </ol>
    <p>
      You will need to handle authentication using JWT Tokens and Knex with
      Mysql. This should be using the MVC Architecture.
    </p>
    <p class="p-4 bg-dark text-light text-center">
      <a
        class="btn btn-outline-info"
        href="https://github.com/clumsynite"
        target="_blank"
        title="GIthub Profile"
      >
        Built by Rishabh Pathak</a
      >
    </p>
  </div>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>
ul {
  list-style-type: disc;
}
</style>
