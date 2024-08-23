#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("5BFX4Zoj2NwRB6MheKbo9TpvTpQvocEJkPbWk8PQFwpc");

#[program]
pub mod round3 {
    use super::*;

  pub fn close(_ctx: Context<CloseRound3>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.round3.count = ctx.accounts.round3.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.round3.count = ctx.accounts.round3.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeRound3>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.round3.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeRound3<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Round3::INIT_SPACE,
  payer = payer
  )]
  pub round3: Account<'info, Round3>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseRound3<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub round3: Account<'info, Round3>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub round3: Account<'info, Round3>,
}

#[account]
#[derive(InitSpace)]
pub struct Round3 {
  count: u8,
}
