use anchor_lang::prelude::*;

declare_id!("H6FFShDibXXpM5292Pzbb1FbA1MV3ZgRXBoq5EPsWxd7");

#[program]
pub mod project {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
