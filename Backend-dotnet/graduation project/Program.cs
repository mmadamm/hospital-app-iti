using graduationProject.DAL;
using GraduationProject.BL;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using ServiceStack;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);
const string AllowAllPolicy = "AllowAllPolicy";

// Add services to the container.
#region Default

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

#endregion

#region DataBase
string? connectionString = builder.Configuration.GetConnectionString("Hospital");
builder.Services.AddDbContext<HospitalContext>(options =>
    options.UseSqlServer(connectionString));
#endregion
#region Asp Identity 
builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
    {
        options.Password.RequiredLength = 8;
    })
    .AddEntityFrameworkStores<HospitalContext>();
#endregion
#region Authentication
//builder.Services.AddAuthentication(options =>
//{
//    options.DefaultAuthenticateScheme = "XYZ";
//    options.DefaultChallengeScheme = "XYZ";

//});

#endregion
#region Authoriziation
// DoctorPolicy
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("DoctorPolicy", p => p.RequireClaim(ClaimTypes.Role, "Doctor"));
});

// PatientPolicy
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("PatientPolicy", p => p.RequireClaim(ClaimTypes.Role, "Patient"));
});

// AdminPolicy
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminPolicy", p => p.RequireClaim(ClaimTypes.Role, "Admin"));
});

// ReceptionPolicy
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("ReceptionPolicy", p => p.RequireClaim(ClaimTypes.Role, "Reception"));
});



#endregion

#region Repos

builder.Services.AddScoped<IPatientRepo, PatientRepo>();

builder.Services.AddScoped<IDoctorRepo, DoctorRepo>();
builder.Services.AddScoped<IVisitReviewAndRateRepo, VisitReviewAndRateRepo>();
builder.Services.AddScoped<IWeekScheduleRepo, WeekScheduleRepo>();
builder.Services.AddScoped<IPatientVisitRepo, PatientVisitRepo>();
builder.Services.AddScoped<IAdminRepo, AdminRepo>();
builder.Services.AddScoped<IVisitCountRepo, VisitCountRepo>();
builder.Services.AddScoped<IMedicalHistoryRepo, MedicalHistoryRepo>();
#endregion

#region Unit of work

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

#endregion
#region Managers
builder.Services.AddScoped<IPatientManager, PatientManager>();

builder.Services.AddScoped<IDoctorManager, DoctorManager>();

builder.Services.AddScoped<IAdminManager, AdminManager>();
#endregion
#region cors
builder.Services.AddCors(options =>
{
    options.AddPolicy(AllowAllPolicy, builder =>
    {
        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});
#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCors(AllowAllPolicy);
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
