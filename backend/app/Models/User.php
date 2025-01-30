<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Sanctum\NewAccessToken;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    public static  $UUID_ADMIN = '9be38e89-ed9e-4b5c-bcb2-463f51f73ac8';
    public static  $UUID_CUST = 'cea8e4f8-c85c-4049-9aaf-44574622cc2c';


    // Nonaktifkan autoincrementing
    public $table = 'users';
    public $incrementing = false;

    // Set primary key type ke string
    protected $keyType = 'string';

    // Override boot function untuk men-generate UUID secara otomatis
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (!$model->getKey()) {
                $model->{$model->getKeyName()} = (string) Str::uuid(); // generate UUID
            }
        });
    }
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'address'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function user_role(){
        return $this->hasMany(SetRole::class, 'id_user');
    }

    public function actor_set_role(){
        return $this->hasMany(SetRole::class, 'id_actor');
    }
    public function actor_mobil(){
        return $this->hasMany(Mobil::class, 'id_actor');
    }
    public function actor_category(){
        return $this->hasMany(Category::class, 'id_actor');
    }
    public function actor_merk(){
        return $this->hasMany(MerkMobil::class, 'id_actor');
    }

    public function bookings(){
        return $this->hasMany(Booking::class, 'id_user');
    }

    public function createToken(string $name, array $abilities = ['*'])
    {
        $token = $this->tokens()->create([
            'name' => $name,
            'token' => hash('sha256', $plainTextToken = Str::random(240)),
            'abilities' => $abilities,
        ]);

        return new NewAccessToken($token, $token->getKey().'|'.$plainTextToken);
    }
}
