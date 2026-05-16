using Microsoft.EntityFrameworkCore;
using PaymentsOps.Api.Data;

namespace PaymentsOps.Api.Features.Analytics;

public static class AnalyticsEndpoints
{
    public static void MapAnalyticsEndpoints(this WebApplication app)
    {
        app.MapGet(
            "/api/analytics/summary",
            async (AppDbContext db) =>
            {
                var totalMerchants = await db.Merchants.CountAsync();
                var totalTransactions = await db.Transactions.CountAsync();

                var approvedTransactions = await db.Transactions.CountAsync(t =>
                    t.Status == "Approved"
                );

                var pendingMerchants = await db.Merchants.CountAsync(m => m.Status == "Pending");

                var highRiskMerchants = await db.Merchants.CountAsync(m => m.RiskLevel == "High");

                var chargebacks = await db.Transactions.CountAsync(t => t.Chargeback);

                var transactionVolume = await db.Transactions.SumAsync(t => t.Amount);

                var approvalRate =
                    totalTransactions == 0
                        ? 0
                        : Math.Round((decimal)approvedTransactions / totalTransactions * 100, 2);

                var chargebackRatio =
                    totalTransactions == 0
                        ? 0
                        : Math.Round((decimal)chargebacks / totalTransactions * 100, 2);

                return Results.Ok(
                    new
                    {
                        TotalMerchants = totalMerchants,
                        TotalTransactions = totalTransactions,
                        TransactionVolume = transactionVolume,
                        ApprovalRate = approvalRate,
                        PendingMerchants = pendingMerchants,
                        HighRiskMerchants = highRiskMerchants,
                        ChargebackRatio = chargebackRatio,
                    }
                );
            }
        );
    }
}
