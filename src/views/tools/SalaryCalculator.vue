<template>
  <div class="tool-page salary-calculator-page">
    <div class="container-lg">
      
      <!-- Breadcrumb Navigation -->
      <Breadcrumb toolName="Salary Calculator" category="Finance" />
      
      <!-- Hero Section -->
      <section class="hero-section" data-aos="fade-up">
        <p class="eyebrow">
          <Icon name="dollar-sign" :size="16" />
          Financial Planning & Tax Analysis
        </p>
        <h1>Professional Salary & Tax Calculator</h1>
        <p class="hero-subtitle">
          Calculate your exact take-home pay after taxes, deductions, and bonuses. Understand your complete salary breakdown with detailed tax calculations based on your location and income level. Plan your finances with confidence using our comprehensive salary calculator.
        </p>
        <div class="hero-badges">
          <span class="badge">
            <Icon name="target" :size="14" />
            Gross to Net
          </span>
          <span class="badge">
            <Icon name="trending-up" :size="14" />
            Tax Breakdown
          </span>
          <span class="badge">
            <Icon name="bar-chart" :size="14" />
            Visual Analysis
          </span>
          <span class="badge">
            <Icon name="check-circle" :size="14" />
            Multi-Country
          </span>
        </div>
      </section>

      <!-- AI-Readable Summary Box -->
      <div class="ai-summary-box glass-card" data-aos="fade-up" data-aos-delay="50">
        <h3 class="summary-title">
          <Icon name="info" :size="20" />
          What This Tool Does
        </h3>
        <p class="summary-text">
          <strong>Salary Calculator</strong> calculates take-home pay (net salary) after taxes and deductions based on gross salary, location, and additional income components. The tool supports multiple countries and regions including Pakistan (FBR tax rates), United States, UK, Canada, UAE, Saudi Arabia, and others. 
          Users enter their gross monthly salary, bonuses, and deductions to receive a detailed breakdown showing income tax, social security contributions, deductions, and final net pay. The calculator helps users understand their complete compensation package, plan budgets, and make informed financial decisions. All calculations use current tax rates and happen instantly in the browser for privacy.
        </p>
      </div>

      <!-- Disclaimer Banner -->
      <div class="disclaimer-banner glass-card" data-aos="fade-up">
        <div class="disclaimer-header">
          <Icon name="alert-circle" :size="24" stroke-width="2" />
          <strong>Financial Information Notice</strong>
        </div>
        <p>
          This calculator provides estimates for informational purposes only. Tax rates and regulations vary by jurisdiction and change frequently. This tool does not constitute financial, tax, or legal advice. Always consult with a qualified tax professional or accountant for accurate tax calculations and financial planning.
        </p>
      </div>

      <!-- Main Tool Interface -->
      <div class="tool-interface glass-card" data-aos="fade-up" data-aos-delay="100">
        <div class="tool-header">
          <h2>
            <Icon name="dollar-sign" :size="20" />
            Salary Calculator
          </h2>
          <div class="tool-actions" v-if="results">
            <button @click="downloadReport" class="icon-btn" title="Download Report">
              <Icon name="download" :size="18" />
            </button>
            <button @click="resetCalculator" class="icon-btn" title="Reset">
              <Icon name="refresh-cw" :size="18" />
            </button>
          </div>
        </div>

        <div class="calculator-grid">
          <!-- Input Panel -->
          <div class="input-panel">
            <h3>Enter Your Details</h3>
            
            <div class="form-group">
              <label>Country / Region</label>
              <select v-model="inputs.country" class="styled-input" @change="onCountryChange">
                <option value="Pakistan">Pakistan</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="UAE">United Arab Emirates</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="India">India</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div class="form-group" v-if="inputs.country === 'United States'">
              <label>
                <Icon name="map" :size="14" />
                State
              </label>
              <select v-model="inputs.state" class="styled-input">
                <option value="">Select State</option>
                <option value="California">California</option>
                <option value="New York">New York</option>
                <option value="Texas">Texas</option>
                <option value="Florida">Florida</option>
                <option value="Illinois">Illinois</option>
                <option value="Pennsylvania">Pennsylvania</option>
                <option value="Ohio">Ohio</option>
                <option value="Georgia">Georgia</option>
                <option value="North Carolina">North Carolina</option>
                <option value="Michigan">Michigan</option>
              </select>
            </div>

            <div class="form-group">
              <label>Fiscal Year</label>
              <select v-model="inputs.fiscalYear" class="styled-input">
                <option value="2024-2025">2024 - 2025 (Latest)</option>
                <option value="2023-2024">2023 - 2024</option>
                <option value="2022-2023">2022 - 2023</option>
              </select>
            </div>

            <div class="form-group">
              <label>
                <Icon name="dollar-sign" :size="14" />
                Monthly Gross Salary
              </label>
              <div class="input-wrapper">
                <span class="currency">{{ getCurrencySymbol() }}</span>
                <input 
                  type="number" 
                  v-model.number="inputs.monthlyGross" 
                  placeholder="e.g. 150000" 
                  class="styled-input big-input"
                  min="0"
                  step="100"
                >
              </div>
              <p class="input-hint">Enter your total monthly income before deductions</p>
            </div>

            <div class="form-group">
              <label>Monthly Bonuses / Allowances (Optional)</label>
              <div class="input-wrapper">
                <span class="currency">{{ getCurrencySymbol() }}</span>
                <input 
                  type="number" 
                  v-model.number="inputs.bonuses" 
                  placeholder="0" 
                  class="styled-input"
                  min="0"
                  step="100"
                >
              </div>
            </div>

            <div class="form-group">
              <label>
                <Icon name="trending-down" :size="14" />
                Monthly Deductions (Optional)
              </label>
              <div class="input-wrapper">
                <span class="currency">{{ getCurrencySymbol() }}</span>
                <input 
                  type="number" 
                  v-model.number="inputs.deductions" 
                  placeholder="0" 
                  class="styled-input"
                  min="0"
                  step="100"
                >
              </div>
              <p class="input-hint">Include health insurance, retirement contributions, etc.</p>
            </div>

            <button @click="calculateSalary" class="btn btn-primary btn-large" :disabled="!inputs.monthlyGross || inputs.monthlyGross <= 0">
              <Icon name="activity" :size="18" stroke-width="2" />
              Calculate Salary Breakdown
            </button>
          </div>

          <!-- Results Panel -->
          <div class="result-panel" v-if="results">
            <h3>Your Salary Breakdown</h3>
            
            <!-- Summary Card -->
            <div class="summary-card glass-card">
              <div class="summary-row">
                <div class="summary-label">
                  <Icon name="dollar-sign" :size="20" stroke-width="2" />
                  <span>Gross Salary</span>
                </div>
                <span class="summary-value gross">{{ formatCurrency(results.grossSalary) }}</span>
              </div>
              
              <div class="summary-row deduction">
                <div class="summary-label">
                  <Icon name="trending-down" :size="20" stroke-width="2" />
                  <span>Income Tax</span>
                </div>
                <span class="summary-value">- {{ formatCurrency(results.incomeTax) }}</span>
              </div>

              <div class="summary-row deduction" v-if="results.otherDeductions > 0">
                <div class="summary-label">
                  <Icon name="trending-down" :size="20" stroke-width="2" />
                  <span>Other Deductions</span>
                </div>
                <span class="summary-value">- {{ formatCurrency(results.otherDeductions) }}</span>
              </div>

              <div class="divider"></div>
              
              <div class="summary-row net">
                <div class="summary-label">
                  <Icon name="check-circle" :size="20" stroke-width="2" />
                  <span>Net Salary (Take Home)</span>
                </div>
                <span class="summary-value net-value">{{ formatCurrency(results.netSalary) }}</span>
              </div>
            </div>

            <!-- Visualization Chart -->
            <div class="chart-container glass-card">
              <h4>Salary Distribution</h4>
              <div class="chart-wrapper">
                <div class="pie-chart" :style="pieChartStyle"></div>
                <div class="chart-legend">
                  <div class="legend-item">
                    <span class="dot net-dot"></span>
                    <div class="legend-content">
                      <span class="legend-label">Net Income</span>
                      <span class="legend-percent">{{ results.netPercent }}%</span>
                    </div>
                  </div>
                  <div class="legend-item">
                    <span class="dot tax-dot"></span>
                    <div class="legend-content">
                      <span class="legend-label">Tax</span>
                      <span class="legend-percent">{{ results.taxPercent }}%</span>
                    </div>
                  </div>
                  <div class="legend-item" v-if="results.deductionPercent > 0">
                    <span class="dot deduction-dot"></span>
                    <div class="legend-content">
                      <span class="legend-label">Deductions</span>
                      <span class="legend-percent">{{ results.deductionPercent }}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Annual Summary -->
            <div class="annual-summary glass-card">
              <h4>Annual Overview</h4>
              <div class="annual-grid">
                <div class="annual-item">
                  <span class="annual-label">Annual Gross</span>
                  <span class="annual-value">{{ formatCurrency(results.annualGross) }}</span>
                </div>
                <div class="annual-item">
                  <span class="annual-label">Annual Tax</span>
                  <span class="annual-value deduction">{{ formatCurrency(results.annualTax) }}</span>
                </div>
                <div class="annual-item">
                  <span class="annual-label">Annual Net</span>
                  <span class="annual-value net">{{ formatCurrency(results.annualNet) }}</span>
                </div>
              </div>
            </div>

            <!-- Tax Breakdown -->
            <div class="tax-breakdown glass-card" v-if="results.taxBreakdown">
              <h4>Tax Calculation Details</h4>
              <div class="breakdown-list">
                <div class="breakdown-item" v-for="(item, idx) in results.taxBreakdown" :key="idx">
                  <span class="breakdown-label">{{ item.label }}</span>
                  <span class="breakdown-value">{{ formatCurrency(item.amount) }}</span>
                </div>
              </div>
            </div>

          </div>

          <!-- Empty State -->
          <div class="result-panel empty-state" v-else>
            <div class="empty-icon-wrapper">
              <Icon name="dollar-sign" :size="48" stroke-width="2" />
            </div>
            <h3>Calculate Your Salary</h3>
            <p>Enter your monthly gross salary and other details to see a complete breakdown of your take-home pay, taxes, and deductions.</p>
          </div>
        </div>
      </div>

      <!-- Content Sections -->
      <section class="content-section" data-aos="fade-up">
        <!-- How It Works -->
        <article class="content-card">
          <h2>
            <Icon name="book-open" :size="24" />
            How This Salary Calculator Works
          </h2>
          <p>
            Our Salary Calculator uses a straightforward process to help you understand exactly how much money you'll take home after taxes and deductions. Here's how it works:
          </p>
          
          <h3>Step-by-Step Process</h3>
          <div class="how-it-works-steps">
            <div class="step-item">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>Enter Your Information</h3>
                <p>Start by selecting your country or region, fiscal year, and entering your monthly gross salary. You can also add bonuses, allowances, and deductions for a more accurate calculation.</p>
              </div>
            </div>
            <div class="step-item">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>Tax Calculation</h3>
                <p>The calculator applies the appropriate tax rates based on your location and income level. Tax systems vary significantly by country—some use progressive tax brackets, while others have flat rates or no income tax at all.</p>
              </div>
            </div>
            <div class="step-item">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>Deduction Processing</h3>
                <p>Any deductions you've entered (such as health insurance, retirement contributions, or other payroll deductions) are subtracted from your gross income after tax calculation.</p>
              </div>
            </div>
            <div class="step-item">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>Net Salary Calculation</h3>
                <p>Your net salary is calculated by subtracting taxes and deductions from your gross salary plus bonuses. This is the amount that will actually be deposited into your bank account.</p>
              </div>
            </div>
            <div class="step-item">
              <div class="step-number">5</div>
              <div class="step-content">
                <h3>Visual Breakdown</h3>
                <p>View your salary breakdown in an easy-to-understand visual format, showing what percentage of your income goes to taxes, deductions, and take-home pay. Annual summaries help with long-term financial planning.</p>
              </div>
            </div>
          </div>
        </article>

        <!-- Use Cases -->
        <article class="content-card">
          <h2>
            <Icon name="target" :size="24" />
            Common Use Cases
          </h2>
          <p>
            This salary calculator is valuable for anyone who wants to understand their compensation better. Here are common use cases:
          </p>
          
          <div class="use-cases-grid">
            <div class="use-case-item">
              <Icon name="briefcase" :size="24" />
              <h4>Full-Time Employees</h4>
              <p>If you're a salaried employee, this calculator helps you understand exactly how much you'll take home after all deductions. It's especially useful when starting a new job, negotiating a raise, or planning your monthly budget based on your actual net income.</p>
            </div>
            <div class="use-case-item">
              <Icon name="trending-up" :size="24" />
              <h4>Job Seekers & Negotiations</h4>
              <p>When evaluating job offers, understanding the difference between gross and net salary is crucial. A higher gross salary doesn't always mean more take-home pay if taxes are higher. This calculator helps you compare offers accurately.</p>
            </div>
            <div class="use-case-item">
              <Icon name="users" :size="24" />
              <h4>Freelancers & Contractors</h4>
              <p>While freelancers typically handle their own taxes, this calculator helps estimate take-home pay from contract work. It's useful for setting rates, understanding tax obligations, and planning for quarterly tax payments.</p>
            </div>
            <div class="use-case-item">
              <Icon name="globe" :size="24" />
              <h4>Remote Workers</h4>
              <p>Remote workers often face complex tax situations, especially if they work for companies in different countries or states. This calculator helps estimate take-home pay when considering remote work opportunities or relocating for work.</p>
            </div>
          </div>
        </article>

        <!-- Benefits -->
        <article class="content-card">
          <h2>
            <Icon name="star" :size="24" />
            Benefits of Understanding Your Salary Breakdown
          </h2>
          <p>
            Knowing exactly how your salary is calculated and what affects your take-home pay is essential for sound financial planning. Here are the key benefits:
          </p>
          
          <ul class="feature-list">
            <li><strong>Accurate Budgeting:</strong> When you know your exact net income, you can create realistic budgets that account for all your expenses, savings goals, and discretionary spending.</li>
            <li><strong>Financial Planning:</strong> Understanding your salary breakdown helps you plan for major expenses, investments, and long-term financial goals.</li>
            <li><strong>Tax Awareness:</strong> Seeing exactly how much you pay in taxes helps you understand your tax burden and identify potential opportunities for tax optimization.</li>
            <li><strong>Salary Negotiation:</strong> When negotiating a new job or raise, understanding gross vs. net salary helps you evaluate offers more accurately.</li>
            <li><strong>Expense Planning:</strong> Knowing your monthly net income allows you to plan for recurring expenses and ensure you have enough cash flow.</li>
            <li><strong>Financial Literacy:</strong> Regularly calculating and reviewing your salary breakdown improves your understanding of personal finance and taxation.</li>
          </ul>
        </article>

        <!-- Educational Content -->
        <article class="content-card">
          <h2>
            <Icon name="book-open" :size="24" />
            Understanding Gross vs. Net Salary
          </h2>
          <p>
            The difference between gross and net salary is fundamental to understanding your compensation. Gross salary is the total amount your employer agrees to pay you before any deductions. Net salary (also called take-home pay) is the amount you actually receive after taxes, insurance, retirement contributions, and other deductions are subtracted.
          </p>
          
          <h3>What is Gross Salary?</h3>
          <p>
            Gross salary includes your base pay plus any bonuses, allowances, overtime pay, commissions, and other forms of compensation. It's the figure typically stated in job offers and employment contracts. For example, if you're offered a position with a "salary of $60,000 per year," that's your gross annual salary.
          </p>
          <p>
            Gross salary is important because it determines your tax bracket and is used to calculate various benefits, loan eligibility, and retirement contributions. However, it's not the amount you'll actually receive in your bank account each month.
          </p>

          <h3>What is Net Salary?</h3>
          <p>
            Net salary is your gross salary minus all deductions. The most significant deduction is usually income tax, which varies based on your income level, location, filing status, and applicable tax laws. Other common deductions include:
          </p>
          <ul class="content-list">
            <li><strong>Social Security / National Insurance:</strong> Mandatory contributions to government social programs</li>
            <li><strong>Health Insurance:</strong> Premiums for employer-provided or required health coverage</li>
            <li><strong>Retirement Contributions:</strong> 401(k), pension, or other retirement plan contributions</li>
            <li><strong>Life Insurance:</strong> Premiums for employer-provided life insurance</li>
            <li><strong>Union Dues:</strong> If applicable to your profession or workplace</li>
            <li><strong>Other Voluntary Deductions:</strong> Charitable contributions, savings plans, etc.</li>
          </ul>

          <h3>How Tax Systems Work</h3>
          <p>
            Tax systems vary significantly around the world. Understanding the basics helps you use this calculator more effectively:
          </p>
          
          <div class="tax-systems-grid">
            <div class="tax-system-card glass-card">
              <h4>Progressive Tax Systems</h4>
              <p>Most countries, including the United States, Canada, and many European nations, use progressive tax systems where higher income is taxed at higher rates. For example, the first $50,000 might be taxed at 10%, income between $50,001-$100,000 at 20%, and income above $100,000 at 30%.</p>
            </div>
            <div class="tax-system-card glass-card">
              <h4>Flat Tax Systems</h4>
              <p>Some countries and regions use flat tax rates where all income is taxed at the same percentage, regardless of income level. This simplifies calculations but can be less equitable for lower-income earners.</p>
            </div>
            <div class="tax-system-card glass-card">
              <h4>No Income Tax</h4>
              <p>Some countries, particularly in the Middle East (like UAE and Saudi Arabia), have no personal income tax. However, they may have other taxes or fees that affect take-home pay.</p>
            </div>
          </div>

          <h3>Factors Affecting Your Net Salary</h3>
          <p>
            Several factors influence how much of your gross salary you actually take home:
          </p>
          <ul class="content-list">
            <li><strong>Tax Brackets:</strong> Higher income generally means a higher percentage goes to taxes</li>
            <li><strong>Location:</strong> Tax rates vary by country, state, and sometimes city</li>
            <li><strong>Filing Status:</strong> Married, single, head of household status affects tax calculations</li>
            <li><strong>Deductions & Credits:</strong> Tax deductions and credits can significantly reduce your tax burden</li>
            <li><strong>Voluntary Contributions:</strong> Retirement savings, health savings accounts, and other pre-tax contributions reduce taxable income</li>
            <li><strong>Bonuses & Overtime:</strong> Additional income may be taxed at different rates or push you into higher brackets</li>
          </ul>

          <h3>Why This Matters for Financial Planning</h3>
          <p>
            Understanding your net salary is crucial for several reasons:
          </p>
          <ul class="content-list">
            <li><strong>Budgeting:</strong> You can only budget with money you actually receive. Basing your budget on gross salary leads to overspending.</li>
            <li><strong>Loan Applications:</strong> Lenders typically consider net income when evaluating loan applications, not gross income.</li>
            <li><strong>Savings Goals:</strong> To save 20% of your income, you need to know what 20% of your net income is, not your gross.</li>
            <li><strong>Expense Planning:</strong> Major expenses like rent, mortgage payments, and car loans should be based on your net income, not gross.</li>
            <li><strong>Retirement Planning:</strong> Understanding how much you actually take home helps you determine how much you can realistically contribute to retirement accounts.</li>
          </ul>

          <h3>Common Salary Calculation Scenarios</h3>
          
          <div class="scenario-cards">
            <div class="scenario-card glass-card">
              <h4>Scenario 1: Standard Full-Time Employee</h4>
              <p><strong>Gross Monthly Salary:</strong> $5,000</p>
              <p><strong>Tax Rate:</strong> 22% (varies by location)</p>
              <p><strong>Monthly Tax:</strong> $1,100</p>
              <p><strong>Health Insurance:</strong> $200/month</p>
              <p><strong>Retirement Contribution:</strong> $500/month (10%)</p>
              <p><strong>Net Monthly Salary:</strong> $3,200</p>
              <p class="scenario-note">In this example, the employee takes home 64% of their gross salary after all deductions.</p>
            </div>
            
            <div class="scenario-card glass-card">
              <h4>Scenario 2: High-Income Earner</h4>
              <p><strong>Gross Monthly Salary:</strong> $15,000</p>
              <p><strong>Tax Rate:</strong> 35% (progressive system, higher bracket)</p>
              <p><strong>Monthly Tax:</strong> $5,250</p>
              <p><strong>Other Deductions:</strong> $800/month</p>
              <p><strong>Net Monthly Salary:</strong> $8,950</p>
              <p class="scenario-note">Higher earners typically see a larger percentage of income go to taxes due to progressive tax systems.</p>
            </div>
            
            <div class="scenario-card glass-card">
              <h4>Scenario 3: No Income Tax Location</h4>
              <p><strong>Gross Monthly Salary:</strong> $8,000</p>
              <p><strong>Tax Rate:</strong> 0% (UAE, Saudi Arabia, etc.)</p>
              <p><strong>Health Insurance:</strong> $300/month</p>
              <p><strong>Retirement Contribution:</strong> $800/month</p>
              <p><strong>Net Monthly Salary:</strong> $6,900</p>
              <p class="scenario-note">In locations without income tax, take-home pay is significantly higher, but other costs of living may be higher as well.</p>
            </div>
          </div>

          <h3>Tips for Maximizing Your Take-Home Pay</h3>
          <p>
            While you can't avoid taxes entirely, there are legitimate strategies to optimize your net income:
          </p>
          <ul class="content-list">
            <li><strong>Maximize Pre-Tax Contributions:</strong> Contributing to retirement accounts, health savings accounts, or flexible spending accounts reduces your taxable income, potentially lowering your tax bracket.</li>
            <li><strong>Understand Tax Deductions:</strong> Keep track of eligible deductions like work-related expenses, charitable contributions, and education expenses.</li>
            <li><strong>Consider Tax-Advantaged Accounts:</strong> Many countries offer tax-advantaged savings or investment accounts that can reduce your tax burden while helping you save for the future.</li>
            <li><strong>Review Your Withholdings:</strong> If you consistently receive large tax refunds, you may be over-withholding. Adjusting your withholdings can increase your monthly take-home pay.</li>
            <li><strong>Plan for Bonuses:</strong> Bonuses are often taxed at a higher rate. Understanding this helps you plan how to use bonus income effectively.</li>
          </ul>
        </article>

        <!-- Tax Slabs Reference -->
        <article class="content-card">
          <h2>
            <Icon name="file-text" :size="24" />
            Tax Slabs Reference (Pakistan - Salaried Individuals)
          </h2>
          <p>
            The following tax slabs apply to salaried individuals in Pakistan for the fiscal year 2024-2025. Tax rates may vary for non-salaried individuals and are subject to change with annual budget announcements.
          </p>
          
          <div class="table-responsive">
            <table class="slabs-table">
              <thead>
                <tr>
                  <th>Annual Income Range</th>
                  <th>Tax Rate</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(slab, index) in taxSlabs" :key="index">
                  <td>{{ slab.range }}</td>
                  <td><strong>{{ slab.rate }}</strong></td>
                  <td>{{ slab.notes || 'Standard rate' }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Important Tax Notes</h3>
          <ul class="feature-list">
            <li>Tax is calculated on annual income, then divided by 12 for monthly estimates</li>
            <li>Salaried individuals typically have lower tax rates than non-salaried taxpayers</li>
            <li>Medical allowances up to 10% of basic salary are generally exempt from tax</li>
            <li>House rent allowance may be partially exempt based on specific conditions</li>
            <li>Tax rates and exemptions are subject to change with annual budget announcements</li>
            <li>Always consult with a tax professional for accurate calculations based on your specific situation</li>
          </ul>
        </article>

        <!-- FAQs -->
        <div class="faq-container">
          <h2>
            <Icon name="help-circle" :size="24" />
            Frequently Asked Questions
          </h2>
          <div class="faq-list">
            <div class="faq-item glass-card">
              <h4>What is the difference between gross salary and net salary?</h4>
              <p>Gross salary is your total income before any deductions, including your base pay, bonuses, and allowances. Net salary (take-home pay) is the amount you actually receive after taxes, insurance, retirement contributions, and other deductions are subtracted from your gross salary. The difference can be significant—typically 20-40% of gross salary goes to taxes and deductions, depending on your income level and location.</p>
            </div>

            <div class="faq-item glass-card">
              <h4>How accurate is this salary calculator?</h4>
              <p>This calculator provides estimates based on standard tax rates and common deduction scenarios. Accuracy depends on several factors: the tax system in your country/region, your specific tax bracket, applicable deductions and credits, and any special circumstances. Tax laws change frequently, and individual situations vary. For precise calculations, especially for complex tax situations, consult with a qualified tax professional or accountant.</p>
            </div>

            <div class="faq-item glass-card">
              <h4>Why does my take-home pay vary by location?</h4>
              <p>Tax rates and structures vary dramatically by country, state, and sometimes city. For example, some locations have no income tax (UAE, Saudi Arabia), while others have progressive tax systems with rates ranging from 10% to 50% or more. Additionally, some locations have state or local taxes in addition to federal taxes. Cost of living, social security systems, and mandatory deductions also vary by location, all affecting your net salary.</p>
            </div>

            <div class="faq-item glass-card">
              <h4>Are bonuses taxed differently than regular salary?</h4>
              <p>In many tax systems, bonuses are often subject to supplemental withholding rates, which can be higher than regular income tax rates. However, when you file your annual tax return, bonuses are typically combined with your regular income and taxed according to your overall tax bracket. The higher withholding on bonuses often results in a larger tax refund, but it means less take-home pay in the month you receive the bonus.</p>
            </div>

            <div class="faq-item glass-card">
              <h4>What deductions can reduce my taxable income?</h4>
              <p>Common deductions that reduce taxable income include retirement plan contributions (401(k), pension plans), health savings accounts (HSAs), flexible spending accounts (FSAs), certain insurance premiums, and work-related expenses (in some jurisdictions). The specific deductions available depend on your country's tax laws, your employer's benefit offerings, and your individual circumstances. Pre-tax deductions are particularly valuable as they reduce both your taxable income and your tax liability.</p>
            </div>

            <div class="faq-item glass-card">
              <h4>How do I calculate my salary if I'm paid hourly?</h4>
              <p>If you're paid hourly, multiply your hourly rate by the number of hours you work per week, then multiply by 52 (weeks per year) and divide by 12 (months) to get your monthly gross salary. For example, $25/hour × 40 hours/week × 52 weeks ÷ 12 months = $4,333/month gross. Then use this calculator with your monthly gross figure. Remember that hourly workers may have variable hours, so use an average or typical month for planning purposes.</p>
            </div>

            <div class="faq-item glass-card">
              <h4>Can I use this calculator for freelance or contract work?</h4>
              <p>This calculator provides estimates for salaried employees. Freelancers and contractors typically handle their own taxes differently—they're responsible for paying estimated taxes quarterly and may be subject to self-employment taxes in addition to income taxes. However, you can use this calculator to estimate take-home pay from contract income, keeping in mind that you'll need to set aside additional funds for taxes and may not have employer-provided deductions like health insurance.</p>
            </div>

            <div class="faq-item glass-card">
              <h4>What should I do if my calculated net salary doesn't match my actual paycheck?</h4>
              <p>Several factors could cause discrepancies: employer-specific deductions not included in the calculator, different tax withholding methods, state/local taxes not accounted for, or special tax situations (multiple jobs, dependents, etc.). Review your pay stub to identify all deductions. If significant differences persist, consult with your HR department or a tax professional to understand your specific situation.</p>
            </div>

            <div class="faq-item glass-card">
              <h4>How often should I recalculate my salary breakdown?</h4>
              <p>Recalculate whenever your income changes (raise, promotion, new job), when tax laws change (typically annually with budget announcements), when you move to a different location with different tax rates, or when your deductions change (new insurance plan, increased retirement contributions). Regular recalculation helps you maintain accurate budgets and financial plans.</p>
            </div>

            <div class="faq-item glass-card">
              <h4>Does this calculator account for all types of taxes?</h4>
              <p>This calculator focuses primarily on income tax. Depending on your location, you may also be subject to social security taxes, Medicare/National Insurance contributions, state taxes, local taxes, and other mandatory contributions. Some of these may be included in the calculation depending on your selected country, but comprehensive coverage of all tax types in all jurisdictions is not possible. Always review your pay stub and consult tax professionals for complete accuracy.</p>
            </div>
          </div>
        </div>

        <!-- Trust & Privacy -->
        <div class="trust-section">
          <div class="trust-card">
            <Icon name="shield" :size="32" />
            <h3>Privacy & Security</h3>
            <p>
              All calculations happen directly in your web browser. We never store, transmit, or have access to 
              your personal financial data. Your information stays completely private on your device.
            </p>
          </div>
          <div class="trust-card">
            <Icon name="alert-circle" :size="32" />
            <h3>Financial Disclaimer</h3>
            <p>
              This calculator provides estimates for informational purposes only. It is not a substitute for 
              professional financial, tax, or legal advice. Always consult with qualified professionals for personalized guidance.
            </p>
          </div>
        </div>

        <!-- CTA -->
        <div class="cta-section">
          <h2>Ready to Plan Your Finances?</h2>
          <p>Use our other financial tools to create a comprehensive financial plan</p>
          <div class="cta-buttons">
            <router-link to="/tools/loan-calculator" class="btn btn-primary">
              <Icon name="trending-up" :size="18" />
              Try Loan Calculator
            </router-link>
            <router-link to="/tools/bmi-calculator" class="btn btn-outline">
              <Icon name="heart" :size="18" />
              Check Health Metrics
            </router-link>
          </div>
        </div>

      </section>

      <!-- Featured Tools Section -->
      <section class="featured-tools-section" data-aos="fade-up">
        <h2>
          <Icon name="star" :size="24" />
          Related Finance & Productivity Tools
        </h2>
        <p class="section-subtitle">Explore other tools to support your financial planning and decision-making</p>
        <div class="featured-tools-grid">
          <router-link 
            v-for="tool in featuredTools" 
            :key="tool.path"
            :to="tool.path"
            class="featured-tool-card"
          >
            <div class="tool-icon-wrapper">
              <Icon :name="tool.icon" :size="32" />
            </div>
            <h3>{{ tool.name }}</h3>
            <p>{{ tool.description }}</p>
            <span class="tool-link">
              Try Now
              <Icon name="arrow-right" :size="16" />
            </span>
          </router-link>
        </div>
      </section>

      <!-- Related Tools Section -->
      <RelatedTools currentTool="/tools/salary-tax-calculator" category="Finance" />

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useSEO } from '@/composables/useSEO';
import { 
  generateToolSchema, 
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  generateSchemaGraph,
  injectStructuredData 
} from '@/utils/structuredData';
import AOS from 'aos';
import Icon from '@/components/Icon.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import RelatedTools from '@/components/RelatedTools.vue';

// SEO Configuration with enhanced AI/LLM optimization
const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://fikrna.com';
const currentUrl = typeof window !== 'undefined' ? window.location.href : `${baseUrl}/tools/salary-tax-calculator`;

useSEO({
  title: 'Free Salary Calculator 2025 | Gross to Net Salary Calculator | Tax & Deductions | Pakistan & International',
  description: 'Calculate exact take-home pay after taxes and deductions. Free salary calculator with detailed tax breakdown for Pakistan (FBR rates), USA, UK, Canada, UAE, Saudi Arabia, and more. Includes bonuses, deductions, and visual salary distribution. Instant results, privacy-first.',
  keywords: 'salary calculator, gross to net salary, take home pay calculator, income tax calculator, salary after tax, net salary calculator, tax calculator, salary breakdown, deductions calculator, Pakistan salary calculator, FBR tax calculator, income tax Pakistan, salary tax calculator 2025',
  canonical: currentUrl,
  jsonLd: null // Will be set in onMounted
});

// State
const inputs = ref({
  country: 'Pakistan',
  state: '',
  fiscalYear: '2024-2025',
  monthlyGross: null,
  bonuses: 0,
  deductions: 0
});

const results = ref(null);
const isEditing = ref(false);

const featuredTools = [
  {
    name: 'Loan Calculator',
    path: '/tools/loan-calculator',
    icon: 'trending-up',
    description: 'Calculate monthly EMI payments, total interest, and create amortization schedules for home loans, car loans, and personal loans.'
  },
  {
    name: 'BMI Calculator',
    path: '/tools/bmi-calculator',
    icon: 'heart',
    description: 'Calculate your Body Mass Index and get health recommendations. Understanding your health metrics supports overall financial wellness.'
  },
  {
    name: 'Habit Tracker',
    path: '/tools/habit-tracker',
    icon: 'check-circle',
    description: 'Build healthy financial habits and track your progress toward financial goals'
  }
];

// Tax Slabs (Pakistan 2024-2025)
const taxSlabs = [
  { range: 'Up to Rs. 600,000', rate: '0%', notes: 'No tax on first 600k' },
  { range: 'Rs. 600,001 - 1,200,000', rate: '5% of amount exceeding 600k', notes: 'Progressive rate' },
  { range: 'Rs. 1,200,001 - 2,200,000', rate: 'Rs. 30,000 + 15% of excess over 1.2M', notes: 'Progressive rate' },
  { range: 'Rs. 2,200,001 - 3,200,000', rate: 'Rs. 180,000 + 25% of excess over 2.2M', notes: 'Progressive rate' },
  { range: 'Rs. 3,200,001 - 4,100,000', rate: 'Rs. 430,000 + 30% of excess over 3.2M', notes: 'Progressive rate' },
  { range: 'Above Rs. 4,100,000', rate: 'Rs. 700,000 + 35% of excess over 4.1M', notes: 'Maximum rate' }
];

// Computed
const pieChartStyle = computed(() => {
  if (!results.value) return {};
  const taxDeg = (results.value.taxPercent / 100) * 360;
  const deductionDeg = results.value.deductionPercent > 0 
    ? (results.value.deductionPercent / 100) * 360 
    : 0;
  const netDeg = 360 - taxDeg - deductionDeg;
  
  if (deductionDeg > 0) {
    return {
      background: `conic-gradient(
        #EF4444 0deg ${taxDeg}deg,
        #F59E0B ${taxDeg}deg ${taxDeg + deductionDeg}deg,
        #10B981 ${taxDeg + deductionDeg}deg 360deg
      )`
    };
  }
  return {
    background: `conic-gradient(#EF4444 0deg ${taxDeg}deg, #10B981 ${taxDeg}deg 360deg)`
  };
});

// Methods
function getCurrencySymbol() {
  const symbols = {
    'Pakistan': 'Rs.',
    'United States': '$',
    'United Kingdom': '£',
    'Canada': 'C$',
    'UAE': 'AED',
    'Saudi Arabia': 'SAR',
    'India': '₹',
    'Australia': 'A$',
    'Germany': '€',
    'Other': '$'
  };
  return symbols[inputs.value.country] || '$';
}

function onCountryChange() {
  inputs.value.state = '';
  // Reset results when country changes
  if (results.value) {
    results.value = null;
  }
}

function calculateTax(annualIncome, country) {
  if (country === 'Pakistan') {
    // Pakistan 2024-2025 tax slabs
    if (annualIncome <= 600000) {
      return 0;
    } else if (annualIncome <= 1200000) {
      return (annualIncome - 600000) * 0.05;
    } else if (annualIncome <= 2200000) {
      return 30000 + (annualIncome - 1200000) * 0.15;
    } else if (annualIncome <= 3200000) {
      return 180000 + (annualIncome - 2200000) * 0.25;
    } else if (annualIncome <= 4100000) {
      return 430000 + (annualIncome - 3200000) * 0.30;
    } else {
      return 700000 + (annualIncome - 4100000) * 0.35;
    }
  } else if (country === 'United States') {
    // Simplified US federal tax (2024 brackets - single filer)
    // This is a simplified calculation; actual US taxes are more complex
    if (annualIncome <= 11600) {
      return annualIncome * 0.10;
    } else if (annualIncome <= 47150) {
      return 1160 + (annualIncome - 11600) * 0.12;
    } else if (annualIncome <= 100525) {
      return 5426 + (annualIncome - 47150) * 0.22;
    } else if (annualIncome <= 191950) {
      return 17198.50 + (annualIncome - 100525) * 0.24;
    } else if (annualIncome <= 243725) {
      return 39098.50 + (annualIncome - 191950) * 0.32;
    } else if (annualIncome <= 609350) {
      return 55678.50 + (annualIncome - 243725) * 0.35;
    } else {
      return 183647.25 + (annualIncome - 609350) * 0.37;
    }
  } else if (country === 'UAE' || country === 'Saudi Arabia') {
    // No income tax
    return 0;
  } else {
    // Generic calculation for other countries (simplified)
    // In a real application, you'd have specific tax tables for each country
    if (annualIncome <= 50000) {
      return annualIncome * 0.15;
    } else if (annualIncome <= 100000) {
      return 7500 + (annualIncome - 50000) * 0.20;
    } else if (annualIncome <= 200000) {
      return 17500 + (annualIncome - 100000) * 0.25;
    } else {
      return 42500 + (annualIncome - 200000) * 0.30;
    }
  }
}

function calculateSalary() {
  if (!inputs.value.monthlyGross || inputs.value.monthlyGross <= 0) return;

  const monthlyGross = inputs.value.monthlyGross;
  const bonuses = inputs.value.bonuses || 0;
  const deductions = inputs.value.deductions || 0;
  
  const totalMonthlyGross = monthlyGross + bonuses;
  const annualGross = totalMonthlyGross * 12;
  
  // Calculate tax
  const annualTax = calculateTax(annualGross, inputs.value.country);
  const monthlyTax = annualTax / 12;
  
  // Calculate net
  const monthlyNet = totalMonthlyGross - monthlyTax - deductions;
  const annualNet = annualGross - annualTax - (deductions * 12);
  
  // Calculate percentages
  const taxPercent = ((monthlyTax / totalMonthlyGross) * 100).toFixed(1);
  const deductionPercent = deductions > 0 
    ? ((deductions / totalMonthlyGross) * 100).toFixed(1) 
    : 0;
  const netPercent = (100 - parseFloat(taxPercent) - parseFloat(deductionPercent)).toFixed(1);
  
  // Tax breakdown
  const taxBreakdown = [];
  if (inputs.value.country === 'Pakistan') {
    const annualIncome = annualGross;
    if (annualIncome > 600000) {
      const firstBracket = Math.min(annualIncome, 1200000) - 600000;
      if (firstBracket > 0) {
        taxBreakdown.push({ label: '5% on Rs. 600k - 1.2M', amount: firstBracket * 0.05 });
      }
    }
    if (annualIncome > 1200000) {
      const secondBracket = Math.min(annualIncome, 2200000) - 1200000;
      if (secondBracket > 0) {
        taxBreakdown.push({ label: '15% on Rs. 1.2M - 2.2M', amount: secondBracket * 0.15 });
      }
    }
    if (annualIncome > 2200000) {
      const thirdBracket = Math.min(annualIncome, 3200000) - 2200000;
      if (thirdBracket > 0) {
        taxBreakdown.push({ label: '25% on Rs. 2.2M - 3.2M', amount: thirdBracket * 0.25 });
      }
    }
    if (annualIncome > 3200000) {
      const fourthBracket = Math.min(annualIncome, 4100000) - 3200000;
      if (fourthBracket > 0) {
        taxBreakdown.push({ label: '30% on Rs. 3.2M - 4.1M', amount: fourthBracket * 0.30 });
      }
    }
    if (annualIncome > 4100000) {
      const fifthBracket = annualIncome - 4100000;
      taxBreakdown.push({ label: '35% on amount above Rs. 4.1M', amount: fifthBracket * 0.35 });
    }
  }
  
  results.value = {
    grossSalary: totalMonthlyGross,
    incomeTax: monthlyTax,
    otherDeductions: deductions,
    netSalary: monthlyNet,
    annualGross: annualGross,
    annualTax: annualTax,
    annualNet: annualNet,
    taxPercent: taxPercent,
    deductionPercent: deductionPercent,
    netPercent: netPercent,
    taxBreakdown: taxBreakdown.length > 0 ? taxBreakdown : null
  };
  
  isEditing.value = false;
  
  // Scroll to results
  setTimeout(() => {
    const resultPanel = document.querySelector('.result-panel');
    if (resultPanel) {
      resultPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, 100);
}

function resetCalculator() {
  inputs.value = {
    country: 'Pakistan',
    state: '',
    fiscalYear: '2024-2025',
    monthlyGross: null,
    bonuses: 0,
    deductions: 0
  };
  results.value = null;
  isEditing.value = false;
}

function editCalculation() {
  isEditing.value = true;
  // Scroll to input panel
  setTimeout(() => {
    const inputPanel = document.querySelector('.input-panel');
    if (inputPanel) {
      inputPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, 100);
}

function formatCurrency(amount) {
  if (!amount && amount !== 0) return '0';
  const symbol = getCurrencySymbol();
  return `${symbol} ${Math.round(amount).toLocaleString()}`;
}

function downloadReport() {
  if (!results.value) return;
  
  let content = `SALARY CALCULATION REPORT\n`;
  content += `Generated: ${new Date().toLocaleString()}\n\n`;
  content += `=`.repeat(60) + `\n\n`;
  
  content += `LOCATION & PERIOD\n`;
  content += `Country: ${inputs.value.country}\n`;
  if (inputs.value.state) content += `State: ${inputs.value.state}\n`;
  content += `Fiscal Year: ${inputs.value.fiscalYear}\n\n`;
  
  content += `MONTHLY BREAKDOWN\n`;
  content += `Gross Salary: ${formatCurrency(results.value.grossSalary)}\n`;
  content += `Income Tax: -${formatCurrency(results.value.incomeTax)}\n`;
  if (results.value.otherDeductions > 0) {
    content += `Other Deductions: -${formatCurrency(results.value.otherDeductions)}\n`;
  }
  content += `Net Salary (Take Home): ${formatCurrency(results.value.netSalary)}\n\n`;
  
  content += `ANNUAL BREAKDOWN\n`;
  content += `Annual Gross: ${formatCurrency(results.value.annualGross)}\n`;
  content += `Annual Tax: -${formatCurrency(results.value.annualTax)}\n`;
  content += `Annual Net: ${formatCurrency(results.value.annualNet)}\n\n`;
  
  content += `PERCENTAGE BREAKDOWN\n`;
  content += `Net Income: ${results.value.netPercent}%\n`;
  content += `Tax: ${results.value.taxPercent}%\n`;
  if (results.value.deductionPercent > 0) {
    content += `Deductions: ${results.value.deductionPercent}%\n`;
  }
  
  content += `\nDISCLAIMER:\n`;
  content += `This is an estimate for informational purposes only.\n`;
  content += `Always consult with a tax professional for accurate calculations.\n`;
  
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `salary-calculation-${new Date().toISOString().split('T')[0]}.txt`;
  link.click();
}

onMounted(() => {
  const toolSchema = generateToolSchema({
    name: 'Professional Salary & Tax Calculator',
    description: 'Calculate your exact take-home pay after taxes and deductions. Free salary calculator with detailed breakdown and visualizations.',
    url: window.location.href
  });
  
  const faqSchema = generateFAQSchema([
    { question: 'What is the difference between gross salary and net salary?', answer: 'Gross salary is your total income before deductions. Net salary (take-home pay) is the amount you receive after taxes, insurance, retirement contributions, and other deductions are subtracted.' },
    { question: 'How accurate is this salary calculator?', answer: 'This calculator provides estimates based on standard tax rates. For precise calculations, especially for complex situations, consult with a qualified tax professional.' },
    { question: 'Why does my take-home pay vary by location?', answer: 'Tax rates and structures vary by country, state, and city. Some locations have no income tax, while others have progressive systems with rates ranging from 10% to 50% or more.' }
  ]);
  
  injectStructuredData([toolSchema, faqSchema]);
});
</script>

<style scoped>
.salary-calculator-page {
  padding: clamp(80px, 12vh, 120px) 0 clamp(60px, 8vh, 80px);
  min-height: 100vh;
  background: var(--bg-app);
}

.container-lg {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}

/* AI Summary Box */
.ai-summary-box {
  padding: 32px;
  margin-bottom: 32px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(20, 184, 166, 0.05) 100%);
  border: 2px solid rgba(16, 185, 129, 0.2);
  border-radius: 20px;
}

.summary-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 16px;
}

.summary-title svg {
  color: #10b981;
}

.summary-text {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--text-primary);
  margin: 0;
}

.summary-text strong {
  color: #10b981;
  font-weight: 700;
}

/* Hero Section */
.hero-section {
  text-align: center;
  margin-bottom: clamp(40px, 6vh, 60px);
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #10b981;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.hero-section h1 {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  margin-bottom: 20px;
  color: var(--text-primary);
  font-weight: 800;
  line-height: 1.2;
}

.hero-subtitle {
  color: var(--text-secondary);
  max-width: 800px;
  margin: 0 auto 24px;
  font-size: clamp(1rem, 1.2vw, 1.125rem);
  line-height: 1.7;
}

.hero-badges {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.875rem;
  color: var(--text-primary);
  font-weight: 500;
}

/* Disclaimer Banner */
.disclaimer-banner {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg);
  background: rgba(59, 130, 246, 0.1);
  border-left: 4px solid #3B82F6;
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-lg);
}

.disclaimer-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: #3B82F6;
  font-size: var(--font-size-lg);
  font-weight: 600;
}

.disclaimer-banner p {
  font-size: var(--font-size-base);
  line-height: 1.7;
  margin: 0;
  color: var(--text-secondary);
}

/* Tool Interface */
.tool-interface {
  max-width: 1200px;
  margin: 0 auto clamp(40px, 6vh, 60px);
  padding: 0;
  overflow: hidden;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
}

.tool-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid var(--glass-border);
}

.tool-header h2 {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-size: 1.5rem;
  color: var(--text-primary);
  font-weight: 700;
}

.tool-actions {
  display: flex;
  gap: 8px;
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  background: transparent;
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.icon-btn:hover {
  background: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
  color: #10b981;
}

/* Calculator Grid */
.calculator-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  padding: 32px;
}

/* Input Panel */
.input-panel h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--text-primary);
  font-size: 1.25rem;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 0.9375rem;
  color: var(--text-primary);
  font-weight: 600;
}

.styled-input {
  width: 100%;
  padding: 12px 16px;
  background: var(--bg-input);
  border: 1px solid var(--glass-border);
  color: var(--text-primary);
  border-radius: var(--radius-md);
  font-size: 1rem;
  transition: all 0.2s;
}

.styled-input:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.big-input {
  font-size: var(--font-size-xl);
  font-weight: 600;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.currency {
  position: absolute;
  left: var(--spacing-md);
  color: var(--text-secondary);
  font-weight: 600;
  z-index: 1;
}

.input-wrapper .styled-input {
  padding-left: calc(var(--spacing-md) * 3);
}

.input-hint {
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
  margin-top: var(--spacing-xs);
  margin-bottom: 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, #10b981, #14b8a6);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-large {
  width: 100%;
  padding: 16px;
  font-size: 1.0625rem;
  justify-content: center;
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--glass-border);
  color: var(--text-primary);
}

.btn-outline:hover {
  background: rgba(16, 185, 129, 0.05);
  border-color: #10b981;
}

/* Result Panel */
.result-panel {
  padding: 0;
}

.result-panel h3 {
  color: var(--text-primary);
  font-size: 1.25rem;
  margin: 0 0 20px 0;
}

/* Summary Card */
.summary-card {
  padding: 24px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: var(--radius-md);
  border: 1px solid var(--glass-border);
  margin-bottom: 24px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid var(--glass-border);
}

.summary-row:last-child {
  border-bottom: none;
}

.summary-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-secondary);
  font-size: var(--font-size-base);
}

.summary-value {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.summary-row.deduction .summary-value {
  color: #EF4444;
}

.summary-row.net {
  padding-top: var(--spacing-md);
  border-top: 2px solid var(--glass-border);
  margin-top: var(--spacing-sm);
}

.net-value {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: #10B981;
}

.divider {
  height: 2px;
  background: var(--glass-border);
  margin: var(--spacing-md) 0;
}

/* Chart Container */
.chart-container {
  padding: 24px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: var(--radius-md);
  border: 1px solid var(--glass-border);
  margin-bottom: 24px;
}

.chart-container h4 {
  color: var(--text-primary);
  margin-bottom: 16px;
  font-size: 1.125rem;
}

.chart-wrapper {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
  flex-wrap: wrap;
}

.pie-chart {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 4px solid var(--glass-border);
}

.chart-legend {
  flex: 1;
  min-width: 200px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.legend-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.legend-label {
  color: var(--text-secondary);
  font-size: var(--font-size-base);
}

.legend-percent {
  color: var(--text-primary);
  font-weight: 600;
  font-size: var(--font-size-lg);
}

.dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  flex-shrink: 0;
}

.net-dot {
  background: #10B981;
}

.tax-dot {
  background: #EF4444;
}

.deduction-dot {
  background: #F59E0B;
}

/* Annual Summary */
.annual-summary {
  padding: 24px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: var(--radius-md);
  border: 1px solid var(--glass-border);
  margin-bottom: 24px;
}

.annual-summary h4 {
  color: var(--text-primary);
  margin-bottom: 16px;
  font-size: 1.125rem;
}

.annual-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

.annual-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  padding: var(--spacing-md);
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-md);
  border: 1px solid var(--glass-border);
}

.annual-label {
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
}

.annual-value {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--text-primary);
}

.annual-value.deduction {
  color: #EF4444;
}

.annual-value.net {
  color: #10B981;
}

/* Tax Breakdown */
.tax-breakdown {
  padding: 24px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: var(--radius-md);
  border: 1px solid var(--glass-border);
  margin-bottom: 24px;
}

.tax-breakdown h4 {
  color: var(--text-primary);
  margin-bottom: 16px;
  font-size: 1.125rem;
}

.breakdown-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--glass-border);
}

.breakdown-item:last-child {
  border-bottom: none;
}

.breakdown-label {
  color: var(--text-secondary);
  font-size: var(--font-size-base);
}

.breakdown-value {
  color: var(--text-primary);
  font-weight: 600;
  font-size: var(--font-size-base);
}


/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 32px;
  opacity: 0.7;
}

.empty-state svg {
  color: var(--text-tertiary);
  margin-bottom: 16px;
}

.empty-state h3 {
  color: var(--text-primary);
  margin-bottom: 8px;
  font-size: 1.25rem;
}

.empty-state p {
  color: var(--text-secondary);
  margin: 0;
}

/* Content Sections */
.content-section {
  max-width: 900px;
  margin: 0 auto;
}

.content-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  padding: clamp(32px, 5vh, 48px);
  border-radius: var(--radius-xl);
  margin-bottom: 32px;
}

.content-card h2 {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: var(--text-primary);
  margin-top: 0;
  margin-bottom: 20px;
  font-weight: 800;
}

.content-card h3 {
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  color: var(--text-primary);
  margin-top: 32px;
  margin-bottom: 12px;
  font-weight: 700;
}

.content-card p {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 16px;
  font-size: 1rem;
}

.content-list {
  list-style: none;
  padding: 0;
  margin: var(--spacing-md) 0;
}

.content-list li {
  padding: var(--spacing-sm) 0;
  padding-left: var(--spacing-lg);
  position: relative;
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: var(--font-size-base);
}

.content-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--primary);
  font-weight: bold;
}

/* How It Works Steps */
.how-it-works-steps {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;
}

.step-item {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding: 20px;
  background: rgba(16, 185, 129, 0.05);
  border-left: 4px solid #10b981;
  border-radius: var(--radius-md);
}

.step-number {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #10b981, #14b8a6);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  font-size: 1.25rem;
}

.step-content h3 {
  color: var(--text-primary);
  margin-bottom: 8px;
  font-size: 1.125rem;
  font-weight: 700;
}

.step-content p {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
  font-size: 0.9375rem;
}

/* Benefits Grid */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

.benefit-card {
  padding: var(--spacing-xl);
  text-align: center;
}

.benefit-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-light);
  border-radius: var(--radius-full);
  color: var(--primary);
}

.benefit-card h3 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-lg);
}

.benefit-card p {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
  font-size: var(--font-size-base);
}

/* Use Cases Grid */
.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

.use-case-card {
  padding: var(--spacing-xl);
}

.use-case-card h3 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-lg);
}

.use-case-card p {
  color: var(--text-secondary);
  line-height: 1.8;
  margin: 0;
  font-size: var(--font-size-base);
}


/* Tax Table */
.table-responsive {
  overflow-x: auto;
  margin: var(--spacing-lg) 0;
}

.slabs-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--glass-bg);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.slabs-table th,
.slabs-table td {
  padding: var(--spacing-md);
  text-align: left;
  border-bottom: 1px solid var(--glass-border);
}

.slabs-table th {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
  font-weight: 600;
  font-size: var(--font-size-base);
}

.slabs-table td {
  color: var(--text-secondary);
  font-size: var(--font-size-base);
}

.slabs-table tr:last-child td {
  border-bottom: none;
}

.tax-notes {
  padding: var(--spacing-xl);
  margin-top: var(--spacing-lg);
}

.tax-notes h3 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-lg);
}

/* FAQ Section */
.faq-container {
  margin-top: 48px;
}

.faq-container h2 {
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: center;
  justify-content: center;
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: var(--text-primary);
  margin-bottom: 32px;
  font-weight: 800;
}

.faq-list {
  display: grid;
  gap: 16px;
}

.faq-item {
  padding: 24px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
}

.faq-item h4 {
  color: #10b981;
  margin-bottom: 12px;
  font-size: 1.125rem;
  font-weight: 700;
}

.faq-item p {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
  font-size: 0.9375rem;
}

/* Trust Section */
.trust-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 48px;
}

.trust-card {
  padding: 32px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  text-align: center;
}

.trust-card svg {
  color: #10b981;
  margin-bottom: 16px;
}

.trust-card h3 {
  color: var(--text-primary);
  margin: 0 0 12px;
  font-size: 1.25rem;
  font-weight: 700;
}

.trust-card p {
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.7;
}

/* CTA Section */
.cta-section {
  text-align: center;
  padding: 48px 32px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.05));
  border: 2px solid rgba(16, 185, 129, 0.2);
  border-radius: var(--radius-xl);
  margin-top: 48px;
}

.cta-section h2 {
  color: var(--text-primary);
  margin: 0 0 12px;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
}

.cta-section > p {
  color: var(--text-secondary);
  margin: 0 0 24px;
  font-size: 1rem;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

/* Featured Tools */
.featured-tools-section {
  max-width: 1200px;
  margin: clamp(60px, 8vh, 80px) auto clamp(40px, 6vh, 60px);
  padding: clamp(40px, 6vh, 60px) 20px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
}

.featured-tools-section h2 {
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: center;
  justify-content: center;
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: var(--text-primary);
  margin-bottom: 12px;
  font-weight: 800;
}

.section-subtitle {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 40px;
  font-size: 1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.featured-tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
}

.featured-tool-card {
  display: flex;
  flex-direction: column;
  padding: 32px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
}

.featured-tool-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: rgba(16, 185, 129, 0.3);
}

.tool-icon-wrapper {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 185, 129, 0.1);
  border-radius: var(--radius-md);
  margin-bottom: 16px;
}

.tool-icon-wrapper svg {
  color: #10b981;
}

.featured-tool-card h3 {
  color: var(--text-primary);
  margin: 0 0 8px;
  font-size: 1.25rem;
  font-weight: 700;
}

.featured-tool-card p {
  color: var(--text-secondary);
  margin: 0 0 16px;
  font-size: 0.9375rem;
  line-height: 1.6;
  flex: 1;
}

.tool-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #10b981;
  font-weight: 600;
  font-size: 0.9375rem;
  margin-top: auto;
}

/* Button Variants */
.btn-text {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: color 0.2s;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.btn-text:hover {
  color: var(--primary);
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--glass-border);
  color: var(--text-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  border-radius: var(--radius-md);
}

.btn-outline:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: var(--primary-light);
}

/* Responsive */
@media (max-width: 768px) {
  .calculator-grid {
    grid-template-columns: 1fr;
    padding: 24px;
    gap: 24px;
  }

  .tool-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 20px;
  }

  .annual-grid {
    grid-template-columns: 1fr;
  }

  .use-cases-grid {
    grid-template-columns: 1fr;
  }

  .trust-section {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .cta-buttons .btn {
    width: 100%;
    justify-content: center;
  }

  .featured-tools-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .featured-tools-section {
    padding: 32px 16px;
    margin: 40px auto 32px;
  }

  .section-subtitle {
    margin-bottom: 32px;
    padding: 0 16px;
  }

  .pie-chart {
    width: 120px;
    height: 120px;
  }
}
</style>