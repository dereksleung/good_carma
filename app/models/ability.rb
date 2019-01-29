class Ability
  include CanCan::Ability

  def initialize(user)
    # Define abilities for the passed in user here. For example:
    #
      user ||= User.new # guest user (not logged in)
      if !user.persisted?
        can :read, :all
      end
    #
    # The first argument to `can` is the action you are giving the user
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on.
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, :published => true
    
    can(:manage, Post) do |p|
      user == p.user
    end

    can(:manage, Comment) do |c|
      user == c.user
    end

    can(:delete, Comment) do |c|
      user == c.post.user
    end

    can(:manage, User) do |u|
      user == u
    end

    can(:read, Post) do |p|
      user.company.id = p.company_id
    end

    can(:read, User) do |u|
      user.company_id = u.company_id
    end
      #
    # See the wiki for details:
    # https://github.com/CanCanCommunity/cancancan/wiki/Defining-Abilities
  end
end
